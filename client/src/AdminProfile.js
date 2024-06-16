import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

export default function AdminProfile() {

  let navigate = useNavigate()
  function logout() {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className='m-5'>
      <div className="mb-4 fs-5 active" style={{ backgroundColor: '#15F5BA' }}>
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <NavLink className="fs-5 nav-link" style={{ color: '#750E21' }} to="">
              <b>Articles</b>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="fs-5 nav-link" style={{ color: '#750E21' }} to="users">
              <b>Users</b>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="fs-5 nav-link" style={{ color: '#750E21' }} to="authors">
              <b>Authors</b>
            </NavLink>
          </li>
        </ul>
      </div>
      <button className='btn btn-danger fs-4' style={{ float: "right" }} onClick={logout}>Log Out</button>
      <Outlet />
    </div>
  )
}
