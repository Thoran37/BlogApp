import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginThunk } from './Redux/userAuthorSlice'
import NavBar from './NavBar'
import Footer from './Footer'

export default function SignIn() {
  let { register, handleSubmit, formState: { errors } } = useForm()

  let { currentUser, loginStatus, errMsg } = useSelector((state) => state.loginReducer)
  let dispatch = useDispatch()
  let navigate = useNavigate()
  function handleFormSubmit(Obj) {
    dispatch(loginThunk(Obj))
  }

  useEffect(() => {
    console.log(currentUser)
    if (loginStatus) {
      if (currentUser.userType === 'user')
        navigate('/user-profile')
      else if (currentUser.userType === 'author')
        navigate('/author-profile')
    }
  }, [loginStatus])

  return (
    <>
      <NavBar />
      <div className='row mx-auto bg-right text-white w-50 mt-5 rounded' style={{ minHeight: "400px" }}>
        <div className='col-6 p-0'>
          <form className='p-4' onSubmit={handleSubmit(handleFormSubmit)}>
            <p className='text-danger mb-0 text-center fs-5'>{errMsg}</p>
            <h1 className='text-center mb-2'>Login</h1>
            {errors.userType?.type === 'required' && (<p className='text-danger m-0 d-inline me-1'>*</p>)}
            <label className='form-label me-2'><b>Login as</b></label>
            <input type='radio' className='form-check-input' value={'user'} {...register('userType', { required: true })} />
            <label className='px-2' htmlFor='user'>User</label>
            <input type='radio' className='form-check-input' value={'author'} {...register('userType', { required: true })} />
            <label className='px-2' htmlFor='author'>Author</label>
            <br />
            {errors.username?.type === 'required' && (<p className='text-danger m-0 d-inline me-1'>*</p>)}
            <label className='form-label mb-0 mt-2'>Username</label>
            <input type='text' className='form-control w-100 mb-3' {...register('username', { required: true })} />
            {errors.password?.type === 'required' && (<p className='text-danger m-0 d-inline me-1'>*</p>)}
            <label className='form-label mb-0'>Password</label>
            <input type='password' className='form-control w-100' {...register('password', { required: true })} />
            {errors.email?.type === 'required' && (<p className='text-danger m-0 d-inline me-1'>*</p>)}
            <button className='btn-success mt-3 btn'>Submit</button>
          </form>
        </div>
        <div className='col-6 rounded-start-circle bg-left justify-content-center align-items-center d-flex flex-column'>
          <h1 className='text-center mb-4' style={{ color: '#FFD23F' }}>Not yet Registered?</h1>
          <Link className='link-info fs-5' to='/signup'>Register</Link>
        </div>
      </div>
      <Footer />
    </>
  )
}
