// Fetch products from localStorage
const products = JSON.parse(localStorage.getItem("products")) || [];

// Function to render products on the user-facing page
function renderProducts() {
    const productContainer = document.querySelector(".item-container");
    productContainer.innerHTML = "";

    products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("item");

        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}" class="product-img">
            <h3>${product.name}</h3>
            <p class="product-description">${product.description || "No description available"}</p>
            <p class="product-price">SH:${product.price}</p>
            <button class="add-to-cart" data-name="${product.name}" data-price="${product.price}" data-img="${product.img}">Add to Cart</button>
        `;
        
        productContainer.appendChild(productDiv);
    });

    // Attach event listeners to dynamically created buttons
    attachAddToCartListeners();
}

// Function to update the cart button
function updateCartButton() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartButton = document.getElementById("cart-button");
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartButton.innerText = `Cart (${totalItems})`;
}

// Function to add an item to the cart
function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(cartItem => cartItem.name === item.name);

    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if the item is already in the cart
    } else {
        cart.push({ ...item, quantity: 1 }); // Add a new item
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart
    updateCartButton();
    
}

// Function to attach event listeners to add-to-cart buttons
function attachAddToCartListeners() {
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const itemName = button.getAttribute("data-name");
            const itemPrice = parseFloat(button.getAttribute("data-price"));
            const itemImg = button.getAttribute("data-img");

            addToCart({ name: itemName, price: itemPrice, img: itemImg });
        });
    });
}
// Function to check if the user is logged in
function isUserLoggedIn() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    return isLoggedIn;
}

// Add item to cart (with login check)
function addToCart(item) {
    // Check if the user is logged in
    if (!isUserLoggedIn()) {
        alert("You must be logged in to add items to the cart.");
        // Optional: Redirect to login page
        window.location.href = "login.html";
        return;
    }

    // If logged in, proceed to add the item to the cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(cartItem => cartItem.name === item.name);

    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if the item is already in the cart
    } else {
        cart.push({ ...item, quantity: 1 }); // Add a new item
    }

    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(cart));

  
}

// Attach event listeners to "Add to Cart" buttons
function attachAddToCartListeners() {
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const itemName = button.getAttribute("data-name");
            const itemPrice = parseFloat(button.getAttribute("data-price"));
            const itemImg = button.getAttribute("data-img");

            addToCart({ name: itemName, price: itemPrice, img: itemImg });
        });
    });
}




// Initial render on page load
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateCartButton();
});


// Initial render on page load
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateCartButton(); // Initialize cart button display
});
