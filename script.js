// Initialize Supabase client
const supabase = supabase.createClient('https://ulxjzsvdbhopliovqyay.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseGp6c3ZkYmhvcGxpb3ZxeWF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyOTEzNDUsImV4cCI6MjA1MDg2NzM0NX0.b97zaEdtYZ4pRGbSCr186noyILI2cN2tiKFRu0HtHZE');

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Query Supabase to check if the username and password exist
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

    if (error) {
        console.error('Error logging in:', error.message);
        alert('Invalid username or password');
        return;
    }

    // If we find the user
    if (data) {
        // Save user data to localStorage (or sessionStorage) to remember the user
        localStorage.setItem('user', JSON.stringify(data));

        // Redirect to the correct dashboard based on user role
        if (data.status === 'admin') {
            window.location.href = 'admin-dashboard.html';
        } else {
            window.location.href = 'business-dashboard.html';
        }
    }
}
