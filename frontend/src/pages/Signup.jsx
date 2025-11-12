import React, { useState } from 'react'
import API from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Signup(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()
  const submit = async (e)=>{
    e.preventDefault()
    try{
      const res = await API.post('/auth/signup', { name, email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      nav('/vehicles')
    }catch(err){ alert(err.response?.data?.message || 'Error') }
  }
  return (
    <form onSubmit={submit} className='form'>
      <h2>Signup</h2>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder='Name' />
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' />
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password' type='password' />
      <button type='submit'>Signup</button>
    </form>
  )
}