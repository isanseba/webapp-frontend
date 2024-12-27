const backendUrl = "https://webapp-backend-kgol.onrender.com/users";

document.getElementById("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(backendUrl);
    const users = await response.json();

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      if (user.status === "admin") {
        showAdminDashboard();
      } else if (user.status === "paid") {
        showBusinessDashboard();
      } else {
        alert("Access restricted for free users. Please upgrade your account.");
      }
    } else {
      alert("Invalid username or password. Please try again.");
    }
  } catch (error) {
    console.error("Error connecting to the server.", error);
    alert("Error connecting to the server.");
  }
});

function showAdminDashboard() {
  document.getElementById("login-container").style.display = "none";
  document.getElementById("admin-dashboard").style.display = "block";
}

function showBusinessDashboard() {
  document.getElementById("login-container").style.display = "none";
  document.getElementById("business-dashboard").style.display = "block";
}

function logout() {
  document.getElementById("admin-dashboard").style.display = "none";
  document.getElementById("business-dashboard").style.display = "none";
  document.getElementById("login-container").style.display = "block";
  document.getElementById("login-form").reset();
}
