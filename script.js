const loginForm = document.getElementById('loginForm');
const apiUrl = 'https://webapp-backend-kgol.onrender.com/users'; // Your backend URL

// Handle login form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Fetch users from the backend
    const response = await fetch(apiUrl);
    const users = await response.json();

    // Find the user with matching username and password
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // If user found, check their status
        localStorage.setItem('currentUser', JSON.stringify(user)); // Store user info in localStorage
        if (user.status === 'admin') {
            window.location.href = 'admin-dashboard.html'; // Redirect to Admin Dashboard
        } else if (user.status === 'paid') {
            window.location.href = 'business-dashboard.html'; // Redirect to Business Dashboard
        } else {
            alert('Access denied. Your account status is not sufficient.');
        }
    } else {
        alert('Invalid username or password!');
    }
});
