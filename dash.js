// دالة لإضافة عنصر للكارت
function reorderItem(name, price) {
    // Retrieve cart or initialize as an empty array
    let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    
    // Push the new item to the cart
    cart.push({name, price});

    // Save the updated cart back to local storage
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Show confirmation
    alert(`${name} has been added to your cart!`);
}

// ربط كل زر Reorder باستخدام الكلاس الفريد .reorder-btn
document.querySelectorAll(".reorder-btn").forEach(button => {
    button.addEventListener("click", function(event) {
        // Stop the link navigation that might be incorrectly triggered or the default button behavior
        event.preventDefault(); 
        
        const orderItem = this.closest(".order-item");
        
        // 1. Get the item name (trimming whitespace)
        const name = orderItem.querySelector(".order-info h4").textContent.trim();
        const priceText = orderItem.querySelector(".order-info p").textContent;
        
        // 2. Robust price extraction using RegEx (looks for $ followed by numbers/decimals)
        const priceMatch = priceText.match(/\$([\d\.]+)/);
        const price = priceMatch ? parseFloat(priceMatch[1]) : 0;
        
        if (price > 0) {
            reorderItem(name, price);
        } else {
            console.error("Could not extract a valid price for reorder.");
            alert("Error: Could not determine item price for reorder.");
        }
    });
});