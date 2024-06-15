import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'
import ErrorPage from './ErrorPage'
import SignIn from './SignIn'
import SignUp from './SignUp'
import UserProfile from './UserProfile'
import AuthorProfile from './AuthorProfile'
import AdminProfile from './AdminProfile'
import ShowArticles from './ShowArticles'
import ArticleById from './ArticleById'
import Admin from './Admin'
import AdminLogin from './AdminLogin'
// dynamic import
const AddArticle = lazy(() => import('./AddArticle'))

export default function App() {

  let router = createBrowserRouter([
    {
      path: '',
      element: <SignIn />,
      errorElement: <ErrorPage />
    },
    {
      path: '/signup',
      element: <SignUp />,
      errorElement: <ErrorPage />
    },
    {
      path: '/adminlogin',
      element: <AdminLogin />,
      errorElement: <ErrorPage />
    },
    {
      path: '/user-profile',
      element: <UserProfile />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '',
          element: <Navigate to='articles' />
        },
        {
          path: 'articles',
          element: <ShowArticles userType='user' />
        },
        {
          path: 'article/:articleId',
          element: <ArticleById />
        },
      ]
    },
    {
      path: '/author-profile',
      element: <AuthorProfile />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '',
          element: <Navigate to='article-by-author/:author' />
        },
        {
          path: 'new-article',
          element: <Suspense fallback="loading..."><AddArticle /></Suspense>
        },
        {
          path: 'article-by-author/:author',
          element: <ShowArticles userType='author' />
        },
        {
          path: 'article/:articleId',
          element: <ArticleById />
        }
      ]
    },
    {
      path: 'admin',
      element: <AdminProfile />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '',
          element: <Admin data='articles' />
        },
        {
          path: 'users',
          element: <Admin data='users' />
        },
        {
          path: 'authors',
          element: <Admin data='authors' />
        }
      ]
    }
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
