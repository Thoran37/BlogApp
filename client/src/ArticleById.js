import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { axiosWithToken } from './axiosWithToken'
import { FcClock } from "react-icons/fc";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FcCalendar } from "react-icons/fc";
import { BiCommentAdd } from "react-icons/bi";
import { FcAnswers } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { MdRestore } from "react-icons/md";

export default function ArticleById() {
  const { state } = useLocation()
  let navigate = useNavigate()
  let [currentArticle, setCurrentArticle] = useState(state);
  let [err, setErr] = useState('')
  let [articleEditStatus, setArticleEditStatus] = useState(false);
  let { currentUser } = useSelector((st) => st.loginReducer)
  let { handleSubmit, register } = useForm()

  function ISOtoUTC(iso) {
    let date = new Date(iso).getUTCDate();
    let day = new Date(iso).getUTCDay();
    let year = new Date(iso).getUTCFullYear();
    return `${date}/${day}/${year}`;
  }

  async function deleteOrRestoreArticle() {
    console.log('deleteOrRestoreArticle')
    let art = { ...currentArticle }
    delete art._id
    let res = await axiosWithToken.put(`http://localhost:4000/author-api/article/${currentArticle.articleId}`, art)
    console.log(res)
    if (res.data.message === 'article deleted' || res.data.message === 'article restored')
      setCurrentArticle({ ...currentArticle, status: res.data.payload })
  }

  async function enableEditState() {
    setArticleEditStatus(true)
  }

  async function saveModifiedArticle(editedArticle) {
    let modArticle = { ...state, ...editedArticle };
    modArticle.dateOfModification = new Date();
    delete modArticle._id;
    let res = await axiosWithToken.put("http://localhost:4000/author-api/article", modArticle);
    if (res.data.message === "Article modified") {
      setArticleEditStatus(false);
      navigate(`/author-profile/article/${editedArticle.articleId}`, { state: res.data.payload });
    }
  }

  async function addComment(obj) {
    obj.username = currentUser.username
    let id = state.articleId
    console.log(obj)
    let res = await axiosWithToken.put(`http://localhost:4000/user-api/comment/${id}`, obj)
    console.log(res)
    console.log(res.data.payload)
    if (res.data.message !== 'Comment added')
      setErr(res.data.message)
    else
      navigate(`/user-profile/article/${id}`, { state: res.data.payload })
  }

  return (
    <div className='container'>
      {articleEditStatus === false ? (
        <>
          <div className='d-flex justify-content-between'>
            <div className='m-2'>
              <h1>{state.title}</h1>
              <span className="py-3">
                <small className=" text-secondary me-4">
                  <FcCalendar className="fs-4" />
                  Created on : {ISOtoUTC(state.dateOfCreation)}
                </small>
                <small className=" text-secondary">
                  <FcClock className="fs-4" />
                  Modified on : {ISOtoUTC(state.dateOfModification)}
                </small>
              </span>
            </div>
            <div>
              {currentUser.userType === 'author' && (
                <>
                  <button className='btn btn-success me-2' onClick={enableEditState}>
                    <CiEdit />
                  </button>
                  {currentArticle.status === true ? (
                    <button className="me-2 btn btn-danger" onClick={deleteOrRestoreArticle}>
                      <MdDelete />
                    </button>
                  ) : (
                    <button className="me-2 btn btn-primary" OnClick={enableEditState}>
                      <MdRestore />
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          <h4><b>Category</b> : {state.category}</h4>
          <p style={{ whiteSpace: "pre-line" }}>{state.content}</p>
          <p className='text-danger'>{err}</p>
          {currentUser.userType === 'user' &&
            <form className='mb-2' onSubmit={handleSubmit(addComment)}>
              <input className='form-control' type='text' {...register('comment')} placeholder='Comment here...' />
              <button className='btn btn-danger mt-2'>
                Add Comment <BiCommentAdd />
              </button>
            </form>
          }
          <div className='text-secondary' style={{ borderTopStyle: "dashed" }} />
          <div className="my-4">
            <h1>Comments</h1>
            {state.comments.length === 0 ? (
              <p className="display-3">No comments yet...</p>
            ) : (
              state.comments.map((obj, ind) => {
                return (
                  <div key={ind} className='p-2'>
                    <h4 className='m-0'>
                      <FcAnswers className="me-2 fs-1 m-0" /> {obj.username}
                    </h4>
                    <p className='ms-5 mb-0'>{obj.comment}</p>
                  </div>
                );
              })
            )}
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit(saveModifiedArticle)}>
          <h1>Add an article</h1>
          <label className='form-label mb-0'>Title</label>
          <input type='text' className='form-control mb-2' {...register('title')} defaultValue={state.title} />
          <label className='form-label mb-0'>Category</label>
          <input type='text' className='form-control mb-2' {...register('category')} defaultValue={state.category} />
          <label className='form-label mb-0'>Content</label>
          <textarea rows="15" className='form-control' {...register('content')} defaultValue={state.content} />
          <button className='btn btn-success mt-2'>Save</button>
        </form>
      )}
    </div >
  )
}
