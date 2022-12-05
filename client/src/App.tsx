import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { userAuthenticated } from './slices/authenticationSlice'
import Error404 from './pages/Error404'
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import axiosConfig from './services/ApiService'
import 'react-toastify/dist/ReactToastify.css'

const App:FC = () => {
  const dispatch = useDispatch()

  const auth = async ():Promise<any> => {
    const response = await axiosConfig.get('/api/v1/users/me')
    if (response.statusText === 'OK') {
      dispatch(userAuthenticated(response.data))
    } else {
      throw new Error('')
    }
  }

  useEffect(() => {
    auth()
  }, [dispatch])

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
