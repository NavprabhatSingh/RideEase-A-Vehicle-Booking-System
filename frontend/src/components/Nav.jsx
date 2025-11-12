import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Nav(){
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const nav = useNavigate()
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    nav('/login')
  }
  return (
    <nav className='nav'>
      <Link to='/'>RideEase</Link>
      <Link to='/vehicles'>Vehicles</Link>
      {user ? (
        <>
          <Link to='/profile'>{user.name}</Link>
          {user.role === 'admin' && <Link to='/admin'>Admin</Link>}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Signup</Link>
        </>
      )}
    </nav>
  )
}
