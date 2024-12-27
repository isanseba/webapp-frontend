// Initialize Supabase client

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ulxjzsvdbhopliovqyay.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


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

console.log("Supabase Client Initialized:", supabase);

async function testSupabaseConnection() {
    try {
        const { data, error } = await supabase.from('users').select('*');
        if (error) throw error;
        console.log("Test Users Data:", data);
    } catch (error) {
        console.error("Error Testing Supabase Connection:", error);
    }
}

testSupabaseConnection();
