// Redirect to login page if not logged in
if (localStorage.getItem("isAdminLoggedIn") !== "true") {
    window.location.href = "admin-login.html";
}

// Logout button functionality
document.getElementById("logout-button").addEventListener("click", () => {
    localStorage.removeItem("isAdminLoggedIn");
    window.location.href = "admin-login.html";
});

// Fetch existing products from localStorage or initialize an empty array
let products = JSON.parse(localStorage.getItem("products")) || [];

// Save products to localStorage
function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

// Render product list in admin page
function renderAdminProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach((product, index) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product-item");

        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}" class="product-img">
            <h3>${product.name}</h3>
            <p>Description: ${product.description || "No description provided"}</p>
            <p>Price: SH${product.price}</p>
            <button onclick="removeProduct(${index})">Remove</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Add a new product
document.getElementById("add-product-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("product-name").value;
    const price = parseFloat(document.getElementById("product-price").value);
    const img = document.getElementById("product-img").value;
    const description = document.getElementById("product-description").value;

    products.push({ name, price, img, description });
    saveProducts(products);
    renderAdminProducts();
    e.target.reset();
});

// Remove a product
function removeProduct(index) {
    products.splice(index, 1);
    saveProducts(products);
    renderAdminProducts();
}

// Initial render
renderAdminProducts();
