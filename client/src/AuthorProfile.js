import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, NavLink } from 'react-router-dom'

export default function AuthorProfile() {

  let { currentUser } = useSelector((state) => state.loginReducer)

  return (
    <div className='m-5'>
      <div className='d-flex justify-content-around mb-2'>
        <NavLink className='btn btn-info' to={`article-by-author/${currentUser.username}`} >Articles</NavLink>
        <NavLink className='btn btn-info' to='new-article'>Add new</NavLink>
      </div>
      <h1 className='text-center text-success'>Blogs of {currentUser.username[0].toUpperCase() + currentUser.username.slice(1)}</h1>
      <Outlet />
    </div >
  )
}
