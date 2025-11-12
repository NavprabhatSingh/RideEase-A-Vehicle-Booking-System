
import React, { useEffect, useState } from 'react'
import API from '../services/api'
import { Link } from 'react-router-dom'

export default function VehicleList(){
  const [vehicles, setVehicles] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState('')
  const [type, setType] = useState('')
  const [sort, setSort] = useState('')

  const fetch = async ()=>{
    try{
      const q = new URLSearchParams({ page, limit:10, search, type, sort }).toString()
      const res = await API.get(`/vehicles?${q}`)
      setVehicles(res.data.data)
      setTotal(res.data.total)
    }catch(err){ alert('Error fetching') }
  }

  useEffect(()=>{ fetch() }, [page, search, type, sort])

  return (
    <div className='container'>
      <h2>Vehicles</h2>
      <div className='controls'>
        <input placeholder='search model' value={search} onChange={e=>setSearch(e.target.value)} />
        <select value={type} onChange={e=>setType(e.target.value)}>
          <option value=''>All Types</option>
          <option value='Car'>Car</option>
          <option value='Bike'>Bike</option>
          <option value='SUV'>SUV</option>
        </select>
        <select value={sort} onChange={e=>setSort(e.target.value)}>
          <option value=''>Sort</option>
          <option value='pricePerHour:asc'>Price ↑</option>
          <option value='pricePerHour:desc'>Price ↓</option>
          <option value='model:asc'>Model A-Z</option>
        </select>
      </div>

      <div className='grid'>
        {vehicles.map(v => (
          <div key={v._id} className='card'>
            <h3>{v.model}</h3>
            <p>Type: {v.type}</p>
            <p>Price/hr: {v.pricePerHour}</p>
            <p>Available: {v.availability ? 'Yes' : 'No'}</p>
            <Link to={`/vehicles/${v._id}`}>Details</Link>
            {v.availability && <Link to={`/book/${v._id}`}>Book</Link>}
          </div>
        ))}
      </div>

      <div className='pagination'>
        <button disabled={page<=1} onClick={()=>setPage(p=>p-1)}>Prev</button>
        <span>Page {page} / {Math.ceil(total/10)||1}</span>
        <button disabled={page>=Math.ceil(total/10)} onClick={()=>setPage(p=>p+1)}>Next</button>
      </div>
    </div>
  )
}