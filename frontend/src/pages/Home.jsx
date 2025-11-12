// frontend/src/pages/Home.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to RideEase</h1>
      <p>Your simple vehicle booking platform.</p>

      {!user ? (
        <div style={{ marginTop: '20px' }}>
          <Link to="/login">
            <button style={{ marginRight: '10px' }}>Login</button>
          </Link>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </div>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <p>Hello, <strong>{user.name}</strong>!</p>
          <Link to="/vehicles">
            <button>Browse Vehicles</button>
          </Link>
        </div>
      )}
    </div>
  )
}
