// No need to import, just use the global 'supabase' object

const supabaseUrl = 'https://ulxjzsvdbhopliovqyay.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseGp6c3ZkYmhvcGxpb3ZxeWF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyOTEzNDUsImV4cCI6MjA1MDg2NzM0NX0.b97zaEdtYZ4pRGbSCr186noyILI2cN2tiKFRu0HtHZE'; // Ensure the key is valid

// Now just use the globally provided `supabase` object
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Log Supabase client initialization to console (for debugging)
console.log("Supabase Client Initialized:", supabase);

// Function to handle login
async function login(event) {
    event.preventDefault();  // Ensure this is called with the event object

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
