
    const DELIVERY_FEE = 3.99;
    const TAX_RATE = 0.1; // 10%

    // 1. Function to load cart from localStorage
    function loadCart() {
        const data = localStorage.getItem("cart");
        return data ? JSON.parse(data) : [];
    }

    // 2. Function to calculate subtotal
    function getCartSubtotal(cart) {
        return cart.reduce((total, item) => total + item.price, 0);
    }

    // 3. Function to display cart items and totals
    function displayCheckoutSummary() {
        const cart = loadCart();
        const itemsContainer = document.getElementById("cart-items-container");
        itemsContainer.innerHTML = ""; // Clear existing content

        const subtotal = getCartSubtotal(cart);
        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax + DELIVERY_FEE;

        // Display individual items
        if (cart.length === 0) {
            itemsContainer.innerHTML = "<p style='text-align: center; color: #ff6b6b;'>Your cart is empty!</p>";
            // Hide the total summary if cart is empty
            document.querySelector('.summary > .total').style.display = 'none';
        } else {
            cart.forEach(item => {
                const div = document.createElement("div");
                div.className = "summary-item";
                div.innerHTML = `
                    <span>${item.name}</span>
                    <span>$${item.price.toFixed(2)}</span>
                `;
                itemsContainer.appendChild(div);
            });
            // Ensure total summary is visible
            document.querySelector('.summary > .total').style.display = 'flex';
        }
        
        // Update summary totals
        document.getElementById("checkout-subtotal").textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById("checkout-delivery").textContent = `$${DELIVERY_FEE.toFixed(2)}`;
        document.getElementById("checkout-tax").textContent = `$${tax.toFixed(2)}`;
        document.getElementById("checkout-total").textContent = `$${total.toFixed(2)}`;
    }

    // Call the function on page load
    window.onload = displayCheckoutSummary;

    // Remaining functions
    function toggleVisa() {
        let method = document.getElementById("payment-method").value;
        let visaBox = document.getElementById("visa-section");

        if (method === "card") {
            visaBox.style.display = "block";
        } else {
            visaBox.style.display = "none";
        }
    }

    function placeOrder(event) {

event.preventDefault();
        alert("Your order has been placed successfully!");
        
        // Clear the cart from localStorage after successful order placement
        localStorage.removeItem("cart"); 
        window.location.href = "track_page.html";
    }
