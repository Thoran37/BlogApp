import React from 'react'
import { Outlet } from 'react-router-dom'

export default function UserProfile() {
  return (
    <div className='m-5 mt-1'>
      <h1 className='text-center text-success'>Blogs</h1>
      <Outlet />
    </div>
  )
}
