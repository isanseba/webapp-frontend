// Initialize Supabase client (Ensure this happens after the script is loaded)
let supabase;

document.addEventListener("DOMContentLoaded", () => {
    // Make sure Supabase is loaded before initializing
    if (typeof supabase === 'undefined') {
        supabase = supabase.createClient('https://ulxjzsvdbhopliovqyay.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseGp6c3ZkYmhvcGxpb3ZxeWF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyOTEzNDUsImV4cCI6MjA1MDg2NzM0NX0.b97zaEdtYZ4pRGbSCr186noyILI2cN2tiKFRu0HtHZE');
        console.log("Supabase client initialized:", supabase);
    } else {
        console.error("Supabase client is not available!");
    }
});

// Function to handle login
async function login(event) {
    event.preventDefault(); // Ensure this is called with the event object

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
