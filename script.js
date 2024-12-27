// Initialize Supabase client
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ulxjzsvdbhopliovqyay.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseGp6c3ZkYmhvcGxpb3ZxeWF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyOTEzNDUsImV4cCI6MjA1MDg2NzM0NX0.b97zaEdtYZ4pRGbSCr186noyILI2cN2tiKFRu0HtHZE'; // Set this in your environment
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to handle login
async function login() {
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

// Test Supabase connection (optional)
async function testSupabaseConnection() {
    try {
        const { data, error } = await supabase.from('users').select('*');
        if (error) throw error;
        console.log("Test Users Data:", data);
    } catch (error) {
        console.error("Error Testing Supabase Connection:", error);
    }
}

// Uncomment this line if you want to test the Supabase connection on load
// testSupabaseConnection();

// Make the login function globally accessible so it's usable in the HTML
window.login = login;
