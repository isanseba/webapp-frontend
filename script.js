// Initialize Supabase client
let supabase;

document.addEventListener("DOMContentLoaded", () => {
    try {
        // Initialize the Supabase client
        supabase = window.supabase.createClient(
            'https://ulxjzsvdbhopliovqyay.supabase.co',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseGp6c3ZkYmhvcGxpb3ZxeWF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyOTEzNDUsImV4cCI6MjA1MDg2NzM0NX0.b97zaEdtYZ4pRGbSCr186noyILI2cN2tiKFRu0HtHZE'
        );
        console.log("Supabase client initialized successfully.");
    } catch (error) {
        console.error("Failed to initialize Supabase client:", error);
    }
});

// Function to handle login
async function login(event) {
    event.preventDefault(); // Prevent form submission reload

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    try {
        // Query the 'users' table for matching credentials
        const { data, error } = await supabase
            .from('users')
            .select('status')
            .eq('username', username)
            .eq('password', password);

        if (error) {
            console.error("Database error:", error);
            alert("Login failed. Please try again later.");
            return;
        }

        if (data && data.length > 0) {
            const user = data[0];
            // Redirect based on user status
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
