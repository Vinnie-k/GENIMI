// Handle registration
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const phone = document.getElementById('phone').value;

    const user = { username, password, phone };

    // Save user details to localStorage
    localStorage.setItem('user', JSON.stringify(user));

    alert('Registration successful!');
    // Redirect back to login page
    window.location.href = "login.html";
});
