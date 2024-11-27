// Handle login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.username === username && storedUser.password === password) {
        alert('Login successful!');
        
        // Set the login state to 'true' in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        console.log("User login state set to:", localStorage.getItem("isLoggedIn"));
        
        // Redirect to the main page (product page)
        window.location.href = "product.html";
    } else {
        alert('Invalid username or password!');
    }
});
// Log out functionality
document.getElementById('logout-button').addEventListener('click', function() {
    // Clear the login state from localStorage
    localStorage.removeItem('isLoggedIn');
    
    // Optionally, clear cart data if you want to reset the cart
    localStorage.removeItem('cart');
    
    // Redirect to the login page or homepage
    window.location.href = "product.html";  // Replace with your login page URL
});
// Function to render the cart items (display cart after login)
function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartContainer.innerHTML = ''; // Clear previous items
    let totalPrice = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    }

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

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

        // Add to total price
        totalPrice += item.price * item.quantity;
    });

    cartTotal.innerText = `Total Price: $${totalPrice.toFixed(2)}`;
}




