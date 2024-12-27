// This is the login function called by both the button click and Enter key press
function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // You can replace this with your actual login validation logic
  if (username && password) {
      // Assuming the login is successful, you can set a session or token
      alert("Logged in as " + username);

      // You can now show the respective dashboard (Admin or Business)
      // For example, if it's admin:
      if (username === 'admin') {
          document.getElementById('admin-dashboard').style.display = 'block';
          document.getElementById('login-form').style.display = 'none';
      } else {
          document.getElementById('business-dashboard').style.display = 'block';
          document.getElementById('login-form').style.display = 'none';
      }
  } else {
      alert("Please enter both username and password.");
  }
}

// Add the event listener for the Enter key press
document.querySelector('form').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
      event.preventDefault();  // Prevent form submission if necessary
      login(); // Trigger the login function
  }
});
