import { Typography } from '@mui/material'
import { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { RootState } from '../..'
import { logout } from '../../services/AuthService'
import { removeUser } from '../../slices/authenticationSlice'
import './index.css'

const Navbar:FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLogged } = useSelector((state:RootState) => state.authenticationSlice)

  const handleLogout = ():void => {
    logout()
    dispatch(removeUser())
    navigate('/')
  }

  return (
    <header>
      <div className="title">
        <h1>Train of Thoughts</h1>
      </div>
      <div className="list">
        <Link to="/"><Typography>Home</Typography></Link>
        <Typography>Blogs</Typography>
        {isLogged ? (
          <Typography
            onClick={handleLogout}
          >
            Logout
          </Typography>
        ) : (
          <>
            <Link to="/signup"><Typography>Signup</Typography></Link>
            <Link to="/login"><Typography>Login</Typography></Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Navbar
