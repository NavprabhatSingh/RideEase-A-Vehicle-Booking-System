
import React, { useEffect, useState } from 'react'
import API from '../services/api'

export default function Profile(){
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const [bookings, setBookings] = useState([])
  useEffect(()=>{ API.get('/bookings/user').then(r=>setBookings(r.data)).catch(()=>{}) }, [])
  return (
    <div className='container'>
      <h2>{user?.name}'s Profile</h2>
      <h3>Bookings</h3>
      {bookings.map(b => (
        <div key={b._id} className='card'>
          <p>Vehicle: {b.vehicle.model}</p>
          <p>From: {new Date(b.startTime).toLocaleString()}</p>
          <p>To: {new Date(b.endTime).toLocaleString()}</p>
          <p>Price: {b.totalPrice}</p>
          <p>Status: {b.status}</p>
        </div>
      ))}
    </div>
  )
}