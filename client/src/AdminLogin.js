import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'
import './App.css'

export default function AdminLogin() {
  let { handleSubmit, register, formState: { errors } } = useForm()
  let [err, setErr] = useState('')
  let navigate = useNavigate()

  async function admin(loginObj) {
    let res = await axios.post("http://localhost:4000/admin-api/login", loginObj)
    if (res.data.message === "Login successful") {
      localStorage.setItem("token", res.data.token)
      navigate('/admin')
    }
    else
      setErr(res.data.message)
  }

  return (
    <div>
      <NavBar />
      <form onSubmit={handleSubmit(admin)} className='mx-auto w-50 bg-right text-white p-3 rounded'>
        <h1 className='text-center mb-2'>Admin Login</h1>
        <p className='text-danger'>{err}</p>
        {errors.username?.type === 'required' && (<p className='text-danger m-0 d-inline me-1'>*</p>)}
        <label className='form-label mb-0 mt-2'>Username</label>
        <input type='text' className='form-control mb-3' {...register('username', { required: true })} />
        {errors.password?.type === 'required' && (<p className='text-danger m-0 d-inline me-1'>*</p>)}
        <label className='form-label mb-0'>Password</label>
        <input type='password' className='form-control' {...register('password', { required: true })} />
        {errors.email?.type === 'required' && (<p className='text-danger m-0 d-inline me-1'>*</p>)}
        <button className='btn-success mt-3 btn'>Submit</button>
      </form>
      <Footer />
    </div>
  )
}
