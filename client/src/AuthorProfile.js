import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'

export default function AuthorProfile() {

  let { currentUser } = useSelector((state) => state.loginReducer)
  let navigate = useNavigate()
  function logout() {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className='m-5'>
      <div className='d-flex justify-content-around mb-2'>
        <NavLink className='btn btn-info' to={`article-by-author/${currentUser.username}`} >Articles</NavLink>
        <NavLink className='btn btn-info' to='new-article'>Add new</NavLink>
      </div>
      <div className='d-flex justify-content-between mb-3'>
        <p></p>
        <h1 className='text-end text-success mb-2'>Blogs of {currentUser.username[0].toUpperCase() + currentUser.username.slice(1)}</h1>
        <button onClick={logout} className='btn btn-danger'>Log Out</button>
      </div>
      <Outlet />
    </div >
  )
}
