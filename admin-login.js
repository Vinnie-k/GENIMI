// Admin credentials (replace with a secure backend authentication mechanism)
const adminCredentials = {
    username: "admin",
    password: "12345"
};

// Handle login form submission
document.getElementById("admin-login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Validate credentials
    if (username === adminCredentials.username && password === adminCredentials.password) {
        // Store login status in localStorage
        localStorage.setItem("isAdminLoggedIn", "true");
        // Redirect to admin page
        window.location.href = "admin.html";
    } else {
        errorMessage.textContent = "Invalid username or password.";
    }
});
