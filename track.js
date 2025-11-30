// track.js — updated so each stage changes every 2 minutes
(function () {
  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  document.addEventListener("DOMContentLoaded", () => {
    const stored = localStorage.getItem("order_confirmed_time");
    if (!stored) {
      console.warn("track.js: no order_confirmed_time in localStorage");
      animateSteps();
      return;
    }

    const confirmed = new Date(parseInt(stored, 10));

    // ** كل مرحلة +2 دقيقة بدل 5 **
    const preparing = new Date(confirmed.getTime() + 2 * 60 * 1000);
    const outForDelivery = new Date(confirmed.getTime() + 4 * 60 * 1000);
    const delivered = new Date(confirmed.getTime() + 6 * 60 * 1000);

    const times = [confirmed, preparing, outForDelivery, delivered];

    const stepEls = Array.from(document.querySelectorAll(".timeline-item"));
    const timeEls = stepEls.map(el => el.querySelector(".time"));
    const progressLine = document.getElementById("progressLine");

    for (let i = 0; i < timeEls.length; i++) {
      if (!timeEls[i]) continue;
      if (i < times.length - 1) {
        timeEls[i].textContent = formatTime(times[i]);
      } else {
        timeEls[i].textContent = "Arriving at " + formatTime(times[i]);
      }
    }

    saveOrderDetails();
    animateSteps();

    if (progressLine) {
      progressLine.style.transition = "width 1s linear";
      progressLine.style.width = "0%";
    }

    const totalMs = times[times.length - 1].getTime() - times[0].getTime();

    function tick() {
      const now = Date.now();

      for (let i = 0; i < stepEls.length; i++) {
        const el = stepEls[i];
        const start = times[i].getTime();
        const end = (i < times.length - 1) ? times[i + 1].getTime() : times[i].getTime();

        if (now >= end) {
          el.classList.add("completed");
          el.classList.remove("active");
        } else if (now >= start && now < end) {
          el.classList.add("active");
          el.classList.remove("completed");
        } else {
          el.classList.remove("completed");
          el.classList.remove("active");
        }
      }

      if (progressLine) {
        const elapsed = clamp(now - times[0].getTime(), 0, totalMs);
        const pct = (elapsed / totalMs) * 100;
        progressLine.style.width = pct + "%";
      }
    }

    tick();
    const intervalId = setInterval(tick, 1000);

    window.addEventListener("beforeunload", () => clearInterval(intervalId));
  });

  function animateSteps() {
    const stepEls = Array.from(document.querySelectorAll(".timeline-item"));
    stepEls.forEach((el) => {
      el.style.opacity = 0;
      el.style.transform = "translateY(10px)";
      el.style.transition = "opacity 400ms ease, transform 400ms ease";
    });

    stepEls.forEach((el, idx) => {
      setTimeout(() => {
        el.style.opacity = 1;
        el.style.transform = "translateY(0)";
      }, 120 * idx);
    });
  }

  function saveOrderDetails() {
    try {
      const orderIdEl = document.getElementById("orderId");
      const orderId = orderIdEl ? orderIdEl.textContent.trim() : null;

      let cartOrder = null;
      try {
        cartOrder = JSON.parse(localStorage.getItem("cart_order"));
      } catch (e) {
        cartOrder = null;
      }

      const details = {};
      document.querySelectorAll(".order-details .detail-row").forEach(row => {
        const label = row.querySelector(".detail-label") ? row.querySelector(".detail-label").textContent.trim().replace(/:$/, "") : null;
        const value = row.querySelector(".detail-value") ? row.querySelector(".detail-value").textContent.trim() : null;
        if (label) details[label] = value;
      });

      const confirmedMs = localStorage.getItem("order_confirmed_time");
      const confirmedTime = confirmedMs ? parseInt(confirmedMs, 10) : null;

      const orderDetails = {
        orderId: orderId || (cartOrder && cartOrder.id) || null,
        savedAt: Date.now(),
        confirmedTime: confirmedTime,
        cart: cartOrder || null,
        pageDetails: details
      };

      localStorage.setItem("order_details", JSON.stringify(orderDetails));
    } catch (e) {
      console.warn("saveOrderDetails failed", e);
    }
  }
})();
function loadOrderDetails() {
    const data = JSON.parse(localStorage.getItem("order_details"));
    if (!data) return;

    document.getElementById("od_id").textContent = data.id;
    document.getElementById("od_date").textContent = data.date;
    document.getElementById("od_items").textContent = data.itemsCount + " Items";
    document.getElementById("od_total").textContent = "$" + data.totalAmount;
    document.getElementById("od_payment").textContent = data.payment;
    document.getElementById("od_address").textContent = data.address;
}

loadOrderDetails();
