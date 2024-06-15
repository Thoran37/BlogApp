import React from 'react'
import { NavLink } from 'react-router-dom'
import './App.css'

export default function NavBar() {
  return (
    <div className="mb-4 fs-5 active" style={{ backgroundColor: '#15F5BA' }}>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <NavLink className="fs-5 nav-link" style={{ color: '#750E21' }} to="/signup">
            <b>SignUp</b>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="fs-5 nav-link" style={{ color: '#750E21' }} to="/">
            <b>SignIn</b>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="fs-5 nav-link" style={{ color: '#750E21' }} to="/adminlogin">
            <b>Admin</b>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
