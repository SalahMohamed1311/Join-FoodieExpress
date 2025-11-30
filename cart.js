
let cart; // Declare the variable first

// Check if the "cart" item exists in localStorage
if (localStorage.getItem("cart")) {
  // IF TRUE (data exists):
  // 1. Get the string data from localStorage.
  // 2. Use JSON.parse() to convert the string back into a JavaScript array/object.
  cart = JSON.parse(localStorage.getItem("cart"));
} else {
  // IF FALSE (data is null/doesn't exist):
  // Initialize the cart as an empty array.
  cart = [];
}
// Save cart to localStorage of the browser
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add product to cart
function addToCart(name, price) {
    cart.push({name, price});
    saveCart();
    alert(`${name} added to cart!`);
}

// Remove product by name
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    saveCart();
}

// Get total number of items
function getCartCount() {
    return cart.length;
}

// Get total price
function getCartTotal() {
    return cart.reduce((total, item) => total + item.price, 0);
}

// Display cart on cart page
function displayCart() {
    const container = document.getElementById("cartContent");
    container.innerHTML = "";
    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        document.getElementById("cartSummary").style.display = "none";
        return;
    }

    cart.forEach(item => {
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart('${item.name}'); displayCart();">Remove</button>
        `;
        container.appendChild(div);
    });

    // Update summary
    document.getElementById("subtotal").textContent = `$${getCartTotal().toFixed(2)}`;
    document.getElementById("tax").textContent = `$${(getCartTotal()*0.1).toFixed(2)}`;
    document.getElementById("total").textContent = `$${(getCartTotal()*1.1 + 3.99).toFixed(2)}`;
    document.getElementById("cartSummary").style.display = "block";
}
function saveOrderTime() {
    const now = new Date();
    localStorage.setItem("order_confirmed_time", now.getTime());
}
function saveFullOrderData() {

    // Check if cart empty
    if (getCartCount() === 0) {
        alert("❌ Your cart is empty! Add items before proceeding.");
        window.location.href = "cart_page.html"; // <-- redirect to your cart page
        return false; // Stop the function 
    }

    const orderData = {
        id: "ORD" + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric"
        }),
        itemsCount: getCartCount(),
        totalAmount: getCartTotal().toFixed(2),
        payment: "Credit Card",
        address: "123 Main Street, Alexandria, Egypt"
    };

    localStorage.setItem("order_details", JSON.stringify(orderData));
    localStorage.setItem("order_confirmed_time", Date.now());

    console.log("Order Saved:", orderData);
return true;
}



