import { useEffect, useState } from 'react'
import { axiosWithToken } from './axiosWithToken'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ShowArticles(props) {
  let [articlesList, setArticlesList] = useState([])
  let navigate = useNavigate()
  let { currentUser } = useSelector((state) => state.loginReducer)

  let res;
  async function getArticles() {
    res = await axiosWithToken.get('https://blogapp-2oh2.onrender.com/user-api/articles')
    setArticlesList(res.data.payload)
  }

  function ISOtoUTC(iso) {
    let date = new Date(iso).getUTCDate();
    let day = new Date(iso).getUTCDay();
    let year = new Date(iso).getUTCFullYear();
    return `${date}/${day}/${year}`;
  }

  async function AuthorArticles() {
    res = await axiosWithToken.get(`https://blogapp-2oh2.onrender.com/author-api/articles/${currentUser.username}`)
    setArticlesList(res.data.payload)
  }

  function articleInfo(article) {
    navigate(`../article/${article.articleId}`, { state: article })
  }

  useEffect(() => {
    if (props.userType === 'user') {
      getArticles()
    }
    if (props.userType === 'author') {
      AuthorArticles()
    }
  }, [])

  return (

    <div className='row row-cols-sm-1 row-cols-md-2 row-cols-lg-4'>
      {articlesList.map((article) => (
        <div className="col mb-3" key={article.articleId}>
          <div className="card bg-dark text-light h-100 mx-1">
            <div className="card-body">
              <h4 className="card-title text-info">{article.title}</h4>
              <p className="card-subtitle"><b>Category</b> : {article.category}</p>
              <p className="card-text">{article.content.substring(0, 80) + '...'}</p>
            </div>
            <div className='col-12 m-3'>
              <button className="btn btn-outline-light mt-3" onClick={() => articleInfo(article)}>Read more</button>
            </div>
            <div className='card-footer'>
              Last updated on {ISOtoUTC(article.dateOfModification)}
            </div>
          </div>
          <Outlet />
        </div>
      ))}
    </div >
  )
}
