import React, { useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const backendURL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  // Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch(`${backendURL}/voter/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password })
    });
    const data = await response.json();
    alert(data.message || "Signup success");
  };

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`${backendURL}/voter/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password })
    });
    const data = await response.json();
    if (data.token) {
      alert("Login successful ✅");
      console.log("JWT:", data.token);
    } else {
      alert("Login failed ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>RideEase 🚗</h1>
      <form onSubmit={handleSignup} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">Sign Up</button>
      </form>

      <form onSubmit={handleLogin}>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default App;
