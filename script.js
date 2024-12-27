// Initialize Supabase client
const supabaseUrl = 'https://ulxjzsvdbhopliovqyay.supabase.co';
const supabaseKey = 'your-supabase-key'; // Make sure this is set properly
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to handle login
async function login(event) {
    event.preventDefault();  // Prevent form submission to avoid page reload

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    try {
        const { data, error } = await supabase
            .from('users')
            .select('status')
            .eq('username', username)
            .eq('password', password);

        if (error) throw error;

        if (data.length > 0) {
            const user = data[0];
            if (user.status === 'admin') {
                window.location.href = "admin-dashboard.html";
            } else if (user.status === 'paid') {
                window.location.href = "business-dashboard.html";
            } else {
                alert("Access denied. Please contact support.");
            }
        } else {
            alert("Invalid username or password.");
        }
    } catch (error) {
        console.error("Error logging in:", error);
        alert("An error occurred. Please try again later.");
    }
}

// Log Supabase client initialization to console
console.log("Supabase Client Initialized:", supabase);

// Make the login function globally accessible
window.login = login;
