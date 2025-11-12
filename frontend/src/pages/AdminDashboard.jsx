
import React, { useState } from 'react'
import API from '../services/api'

export default function AdminDashboard(){
  const [model, setModel] = useState('')
  const [type, setType] = useState('Car')
  const [price, setPrice] = useState(0)

  const submit = async (e)=>{
    e.preventDefault()
    try{
      await API.post('/vehicles', { model, type, pricePerHour: Number(price) })
      alert('Created')
    }catch(err){ alert(err.response?.data?.message || 'Error') }
  }

  return (
    <form className='form' onSubmit={submit}>
      <h2>Admin — Add Vehicle</h2>
      <input value={model} onChange={e=>setModel(e.target.value)} placeholder='Model' />
      <select value={type} onChange={e=>setType(e.target.value)}>
        <option>Car</option>
        <option>Bike</option>
        <option>SUV</option>
      </select>
      <input value={price} onChange={e=>setPrice(e.target.value)} placeholder='Price per hour' type='number' />
      <button type='submit'>Add Vehicle</button>
    </form>
  )
}