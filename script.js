// Function to log out and redirect to login page
function logout() {
    localStorage.removeItem('userId');
    window.location.href = 'login.html'; // Replace with the actual login page URL
  }
  
  // Function to save API keys entered by the business owner
  function saveApiKeys() {
    const googleApiKey = document.getElementById('googleApiKey').value;
    const yelpApiKey = document.getElementById('yelpApiKey').value;
    const sendgridApiKey = document.getElementById('sendgridApiKey').value;
  
    // Assuming the user's ID is stored in localStorage as 'userId'
    const currentUserId = localStorage.getItem('userId');
  
    fetch(`https://webapp-backend-kgol.onrender.com/users/${currentUserId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        googleApiKey: googleApiKey,
        yelpApiKey: yelpApiKey,
        sendgridApiKey: sendgridApiKey
      })
    })
    .then(response => response.json())
    .then(data => {
      alert('API keys saved successfully!');
      console.log(data);
    })
    .catch(error => {
      console.error('Error saving API keys:', error);
    });
  }
  
  // Function to test Google Places API with a mock URL
  function testGooglePlaces() {
    const googleApiKey = document.getElementById('googleApiKey').value;
    if (!googleApiKey) {
      alert('Please enter a valid Google API key.');
      return;
    }
  
    const googleApiUrl = 'https://mock-google-places-api.com'; // Use mock API for testing
    const testLocation = 'New York'; // You can use any location for testing
  
    fetch(`${googleApiUrl}/search?query=${testLocation}&key=${googleApiKey}`)
      .then(response => response.json())
      .then(data => {
        console.log('Google Places Data:', data);
        displayGooglePlacesResults(data);
      })
      .catch(error => {
        console.error('Error fetching Google Places data:', error);
      });
  }
  
  // Function to display Google Places results (for testing purposes)
  function displayGooglePlacesResults(data) {
    const resultsDiv = document.getElementById('googlePlacesResults');
    if (data.results && data.results.length > 0) {
      resultsDiv.innerHTML = `
        <h4>Google Places Results:</h4>
        <ul>
          ${data.results.map(result => `<li>${result.name} - ${result.vicinity}</li>`).join('')}
        </ul>
      `;
    } else {
      resultsDiv.innerHTML = '<p>No results found.</p>';
    }
  }
  
  // Function to check if the user is logged in and show the business dashboard
  document.addEventListener('DOMContentLoaded', () => {
    const currentUserId = localStorage.getItem('userId');
  
    if (!currentUserId) {
      window.location.href = 'login.html'; // Redirect to login if not logged in
      return;
    }
  
    // Fetch user data to determine their status
    fetch(`https://webapp-backend-kgol.onrender.com/users/${currentUserId}`)
      .then(response => response.json())
      .then(user => {
        if (user.status === 'paid') {
          // Show business dashboard if the user is paid
          document.getElementById('business-dashboard').style.display = 'block';
        } else {
          // Redirect to another page for non-paid users (or show a different dashboard)
          alert('You are not authorized to access this dashboard.');
          window.location.href = 'login.html'; // Redirect to login page
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        alert('An error occurred. Please try again.');
      });
  });
  