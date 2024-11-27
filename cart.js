function addToCart(item) {
    if (!isUserLoggedIn()) {
        console.log("User not logged in"); // Debug: Check if this logs unexpectedly
        alert("You must be logged in to add items to the cart.");
        window.location.href = "login.html"; // Redirect to login
        return;
    }

    console.log("User is logged in"); // Debug: Check if this logs when expected

    // Proceed with adding to cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(cartItem => cartItem.name === item.name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartButton();
    alert(`${item.name} has been added to the cart!`);
}
// Function to render the cart items on the cart page
function renderCart() {
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartContainer.innerHTML = ""; // Clear previous items
    let totalPrice = 0;

    cart.forEach((item) => {
        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cart-item");

        cartItemDiv.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="cart-item-img">
            <h3>${item.name}</h3>
            <p>Price: SH${item.price}</p>
            <p>Quantity: 
                <input type="number" value="${item.quantity}" min="1" 
                    onchange="changeQuantity('${item.name}', this.value)">
            </p>
            <button class="remove-button" onclick="removeFromCart('${item.name}')">Remove</button>
        `;

        cartContainer.appendChild(cartItemDiv);

        totalPrice += item.price * item.quantity; // Add to total price
    });

    cartTotal.innerText = `Total Price: SH${totalPrice.toFixed()}`;
}

// Function to remove an item from the cart
function removeFromCart(itemName) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.name !== itemName);

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartButton();
    renderCart();
   
}

// Function to update the quantity of a cart item
function changeQuantity(itemName, newQuantity) {
    if (newQuantity < 1) return; // Prevent invalid quantities

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart.find(cartItem => cartItem.name === itemName);

    if (item) {
        item.quantity = parseInt(newQuantity);
        localStorage.setItem("cart", JSON.stringify(cart));
        
    }
}

// Initialize cart rendering on cart page load
document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    updateCartButton();
});
