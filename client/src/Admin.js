import React, { useEffect, useState } from 'react'
import { axiosWithToken } from './axiosWithToken'

export default function Admin(props) {
  let [articles, setArticles] = useState([])
  let [users, setUsers] = useState([])
  let [authors, setAuthors] = useState([])

  async function getAuthors() {
    let res = await axiosWithToken.get("http://localhost:4000/admin-api/authors")
    setAuthors(res.data.payload)
  }

  async function getArticles() {
    let res = await axiosWithToken.get("http://localhost:4000/admin-api/articles")
    setArticles(res.data.payload)
  }

  async function getUsers() {
    let res = await axiosWithToken.get("http://localhost:4000/admin-api/users")
    setUsers(res.data.payload)
  }

  function getArticleCount(author) {
    let cnt = 0
    articles.forEach(ele => {
      console.log(author)
      console.log(ele.username)
      if (ele.username === author)
        cnt++
    })
    return cnt
  }

  function getCommentCount(user) {
    let cnt = 0
    articles.forEach(ele => {
      ele.comments.forEach(com => {
        if (com.username === user)
          cnt++
      })
    })
    return cnt
  }

  function ISOtoUTC(iso) {
    let date = new Date(iso).getUTCDate();
    let day = new Date(iso).getUTCDay();
    let year = new Date(iso).getUTCFullYear();
    return `${date}/${day}/${year}`;
  }

  useEffect(() => {
    if (props.data === 'authors')
      getAuthors()
    else if (props.data === 'users')
      getUsers()
    else
      getArticles()
  }, [props.data])

  return (
    <div>
      {props.data === 'authors' && (
        <>
          <h1 className='text-center'>Authors</h1>
          <table className="w-75 mx-auto table-info table-striped table-hover table text-center">
            <thead>
              <tr>
                <th>Author Name</th>
                <th>Email</th>
                <th>No.of articles published</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((ele, ind) => (
                <tr key={ind}>
                  <td>{ele.username}</td>
                  <td>{ele.email}</td>
                  <td>{getArticleCount(ele.username)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {props.data === 'users' && (
        <>
          <h1 className='text-center'>Users</h1>
          <table className="w-75 mx-auto table-info table-striped table-hover table text-center">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>No.of articles commented</th>
              </tr>
            </thead>
            <tbody>
              {users.map((ele, ind) => (
                <tr key={ind}>
                  <td>{ele.username[0].toUpperCase() + ele.username.slice(1)}</td>
                  <td>{ele.email}</td>
                  <td>{getCommentCount(ele.username)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {props.data === 'articles' && (
        <>
          <h1 className='text-center'>Articles</h1>
          <table className="w-75 mx-auto table-info table-striped table-hover table text-center">
            <thead>
              <tr>
                <th>Author name</th>
                <th>Title</th>
                <th>Category</th>
                <th>Date of creation</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((ele, ind) => (
                <tr key={ind}>
                  <td>{ele.username[0].toUpperCase() + ele.username.slice(1)}</td>
                  <td>{ele.title[0].toUpperCase() + ele.title.slice(1)}</td>
                  <td>{ele.category[0].toUpperCase() + ele.category.slice(1)}</td>
                  <td>{ISOtoUTC(ele.dateOfCreation)}</td>
                  {ele.status ? <td>Present</td> : <td>Deleted</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}
