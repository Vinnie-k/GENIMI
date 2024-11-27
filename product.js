// Add item to cart
function addToCart(item) {
    // Check if the user is logged in
    if (localStorage.getItem("isLoggedIn") !== "true") {
        alert("You must be logged in to add items to the cart.");
        return;  // Prevent adding the item to the cart if not logged in
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(cartItem => cartItem.name === item.name);

    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item already in cart
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart button
    updateCartButton();
    
}

function isUserLoggedIn() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    return isLoggedIn === "true";
}

// Redirect to login page if user is not logged in
document.addEventListener("DOMContentLoaded", () => {
    if (!isUserLoggedIn()) {
        alert("You must be logged in to view this page.");
        window.location.href = "login.html";
    }
});

// Call the function when the page loads
fetchProducts();


