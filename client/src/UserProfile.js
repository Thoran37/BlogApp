import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function UserProfile() {
  let navigate = useNavigate()
  function logout() {
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <div className='m-5 mt-1'>
      <div className='d-flex justify-content-between mb-3'>
        <p></p>
        <h1 className='text-success'>Blogs</h1>
        <button onClick={logout} className='btn btn-danger'>Log Out</button>
      </div>
      <Outlet />
    </div>
  )
}
