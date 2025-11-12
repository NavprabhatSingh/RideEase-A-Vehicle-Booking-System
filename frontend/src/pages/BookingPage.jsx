
import React, { useState, useEffect } from 'react'
import API from '../services/api'
import { useParams, useNavigate } from 'react-router-dom'

export default function BookingPage(){
  const { id } = useParams()
  const [vehicle, setVehicle] = useState(null)
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const nav = useNavigate()

  useEffect(()=>{ API.get(`/vehicles/${id}`).then(r=>setVehicle(r.data)).catch(()=>{}) }, [id])

  const submit = async (e)=>{
    e.preventDefault()
    try{
      await API.post('/bookings', { vehicleId: id, startTime: start, endTime: end })
      alert('Booked')
      nav('/profile')
    }catch(err){ alert(err.response?.data?.message || 'Error') }
  }

  if(!vehicle) return <div>Loading...</div>
  return (
    <form className='form' onSubmit={submit}>
      <h2>Book {vehicle.model}</h2>
      <label>Start</label>
      <input type='datetime-local' value={start} onChange={e=>setStart(e.target.value)} required />
      <label>End</label>
      <input type='datetime-local' value={end} onChange={e=>setEnd(e.target.value)} required />
      <button type='submit'>Confirm Booking</button>
    </form>
  )
}