// Set the backend URL for your API
const backendUrl = 'https://webapp-backend-kgol.onrender.com'; // Replace with your actual backend URL

// Login function
function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('error-message');

  // Make a GET request to fetch the user list and check credentials
  fetch(`${backendUrl}/users`)
    .then((response) => response.json())
    .then((users) => {
      // Check if the entered credentials match any user
      const user = users.find(
        (u) => u.username === username && u.password === password
      );
      
      if (user) {
        // Check if the user is an admin or a business client
        if (user.username === 'admin') {
          // Show the admin dashboard
          document.getElementById('admin-dashboard').style.display = 'block';
        } else {
          // Show the business dashboard
          document.getElementById('business-dashboard').style.display = 'block';
        }
        // Hide the login section
        document.getElementById('login-section').style.display = 'none';
      } else {
        errorMessage.innerText = 'Invalid username or password';
      }
    });
}

// Logout function
function logout() {
  document.getElementById('login-section').style.display = 'block';
  document.getElementById('admin-dashboard').style.display = 'none';
  document.getElementById('business-dashboard').style.display = 'none';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
}
