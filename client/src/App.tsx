import { FC, useEffect, useState } from 'react'
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
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

const App:FC = () => {
  const dispatch = useDispatch()
  const [updated, setUpdated] = useState(false)
  const [deleted, setDeleted] = useState<boolean>(false)

  useEffect(() => {
    const auth = async ():Promise<void> => {
      const response = await axiosConfig.get('/api/v1/users/me')
      if (response.data) {
        dispatch(userAuthenticated(response.data))
      }
    }
    auth()
  }, [dispatch])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home
        updated={updated}
        setUpdated={setUpdated}
        setDeleted={setDeleted}
        deleted={deleted}
      />,
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
      element: <Profile updated={updated} setUpdated={setUpdated} setDeleted={setDeleted} />,
    },
    {
      path: '/posts/:id',
      element: <BlogDetails />,
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
