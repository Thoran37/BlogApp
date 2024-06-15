import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { axiosWithToken } from './axiosWithToken'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function AddArticle() {

  let { register, handleSubmit } = useForm()
  let { currentUser } = useSelector((state) => state.loginReducer)
  let navigate = useNavigate()
  let [err, setErr] = useState('')

  async function addArticle(articleObj) {
    articleObj.articleId = Date.now()
    articleObj.dateOfCreation = new Date()
    articleObj.dateOfModification = new Date()
    articleObj.username = currentUser.username
    articleObj.comments = []
    articleObj.status = true
    console.log(articleObj)
    let res = await axiosWithToken.post('http://localhost:4000/author-api/article', articleObj)
    console.log(res)
    if (res.data.message === 'New Article created')
      navigate(`/author-profile/article-by-author/${currentUser.username}`)
    else
      setErr(res.data.payload)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(addArticle)} className='container'>
        <p className='text-danger mb-1 mt-3'>{err}</p>
        <h1>Add an article</h1>
        <label className='form-label mb-0'>Title</label>
        <input type='text' className='form-control mb-2' {...register('title')} />
        <label className='form-label mb-0'>Category</label>
        <input type='text' className='form-control mb-2' {...register('category')} />
        <label className='form-label mb-0'>Content</label>
        <textarea rows="15" className='form-control' {...register('content')} />
        <button className='btn btn-success mt-2'>Save</button>
      </form>
    </div>
  )
}
