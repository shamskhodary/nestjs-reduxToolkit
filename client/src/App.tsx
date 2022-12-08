import { FC, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { userAuthenticated } from './slices/authenticationSlice'
import Error404 from './pages/Error404'
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import axiosConfig from './services/ApiService'
import BlogDetails from './components/BlogDetails'
import Profile from './pages/Profile'
import SearchResults from './pages/SearchResults'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import Bookmarks from './pages/Bookmarks'

const App:FC = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const auth = async ():Promise<void> => {
      const response = await axiosConfig.get('/api/v1/users/me')
      if (response.data) {
        dispatch(userAuthenticated(response.data))
        axiosConfig.setHeaders()
        setLoading(true)
        console.log(response.data)
      } else {
        throw new Error('unauthorized')
      }
      return response.data
    }
    auth()
  }, [dispatch, loading])

  console.log(loading)

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/users/:id',
      element: <Profile />,
    },
    {
      path: '/posts/:id',
      element: <BlogDetails />,
    },
    {
      path: '/search',
      element: <SearchResults />,
    },
    {
      path: '/bookmarks',
      element: <Bookmarks />,
    },
    {
      path: '*',
      element: <Error404 />,
    },
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  )
}

export default App
