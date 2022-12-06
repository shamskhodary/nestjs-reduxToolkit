import {
  AppBar, Avatar, Box, IconButton, Toolbar, Typography,
} from '@mui/material'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Home, Search, Bookmarks, Article,
} from '@mui/icons-material'
import { logout } from '../../services/AuthService'
import { removeUser } from '../../slices/authenticationSlice'

import './index.css'
import { RootState } from '../..'

const ApplicationBar:FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state:RootState) => state.authenticationSlice)

  const handleLogout = ():void => {
    dispatch(removeUser(logout()))
    navigate('/')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 1)',
          width: '5rem',
          height: '100vh',
          position: 'fixed',
          left: '0',
          right: 'auto',
          padding: '2rem 0',
        }}
      >
        <Toolbar sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
        }}
        >
          <Box className="logo" onClick={() => navigate('/')}>
            <img
              src="https://img.icons8.com/ios/512/medium-new.png"
              alt="logo"
            />
          </Box>
          <div className="home-icons">
            <IconButton onClick={() => navigate('/')}>
              <Home />
            </IconButton>
            <IconButton>
              {' '}
              <Article />
            </IconButton>
            <IconButton onClick={() => navigate('/bookmarks')}>
              {' '}
              <Bookmarks />
            </IconButton>

            <IconButton onClick={() => navigate('/search')}>
              {' '}
              <Search />
            </IconButton>
          </div>

          <div className="home-profile">
            <Avatar src={user?.image} sx={{ cursor: 'pointer' }} />
            <Typography
              sx={{ color: 'black' }}
              onClick={handleLogout}
            >
              Logout
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </Box>

  )
}

export default ApplicationBar
