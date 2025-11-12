import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import VehicleList from './pages/VehicleList'
import VehicleDetail from './pages/VehicleDetail'
import BookingPage from './pages/BookingPage'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'
import Nav from './components/Nav'
import ProtectedRoute from './components/ProtectedRoute'

function App(){
  return (
    <div>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/vehicles' element={<ProtectedRoute><VehicleList/></ProtectedRoute>} />
        <Route path='/vehicles/:id' element={<ProtectedRoute><VehicleDetail/></ProtectedRoute>} />
        <Route path='/book/:id' element={<ProtectedRoute><BookingPage/></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>} />
        <Route path='/admin' element={<ProtectedRoute adminOnly><AdminDashboard/></ProtectedRoute>} />
      </Routes>
    </div>
  )
}
export default App
