import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import axios from 'axios'
import NavBar from './NavBar'
import Footer from './Footer'

export default function SignUp() {
  let { register, handleSubmit, formState: { errors } } = useForm()
  let [err, setErr] = useState("")
  async function handleFormSubmit(Obj) {
    let res;
    if (Obj.userType === 'user')
      res = await axios.post("http://localhost:4000/user-api/register", Obj)
    if (Obj.userType === 'author')
      res = await axios.post("http://localhost:4000/author-api/register", Obj)
    if (res.status !== 201)
      setErr(res.data.message)
  }

  return (
    <>
      <NavBar />
      <div className='row mx-auto w-50 bg-right mt-5 rounded text-white' style={{ minHeight: "400px" }}>
        <div className='col-6 rounded-end-circle bg-left justify-content-center align-items-center d-flex flex-column'>
          <h1 className='text-center mb-4' style={{ color: '#FFD23F' }}>Already Registered?</h1>
          <Link to='/' className='link-info fs-5'>Login</Link>
        </div>
        <div className='col-6 p-0'>
          <form className='container p-4' onSubmit={handleSubmit(handleFormSubmit)}>
            {err.length !== 0 && <p className='text-success mb-0 text-center'>{err}</p>}
            <h1 className='text-center'>Register</h1>
            {errors.userType?.type === 'required' && (<p className='text-danger m-0 d-inline me-1'>*</p>)}
            <label className='form-label me-2'><b>Register as</b></label>
            <input type='radio' className='form-check-input' value={"user"} {...register('userType', { required: true })} />
            <label className='px-2' htmlFor='user'>User</label>
            <input type='radio' className='form-check-input' value={"author"} {...register('userType', { required: true })} />
            <label className='px-2' htmlFor='author'>Author</label>
            <br />
            {errors.username?.type === 'required' && (<p className='text-danger m-0 d-inline me-1'>*</p>)}
            <label className='form-label mb-0'>Username</label>
            <input type='text' className='form-control w-100 mb-3' {...register('username', { required: true })} />
            {errors.password?.type === 'required' && (<p className='text-danger m-0 d-inline me-1'>*</p>)}
            <label className='form-label mb-0'>Password</label>
            <input type='password' className='form-control w-100 mb-3' {...register('password', { required: true })} />
            {errors.email?.type === 'required' && (<p className='text-danger m-0 d-inline me-1'>*</p>)}
            <label className='form-label mb-0'>Email</label>
            <input type='email' className='form-control w-100' {...register('email', { required: true })} />
            <button className='btn-success mt-3 btn'>Submit</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}
