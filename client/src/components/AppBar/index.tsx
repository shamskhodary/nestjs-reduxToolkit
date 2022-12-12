import {
  AppBar, Avatar, Box, IconButton, Toolbar, Typography,
} from '@mui/material'
import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Home, Article, Create,
} from '@mui/icons-material'
import { logout } from '../../services/AuthService'
import { removeUser } from '../../slices/authenticationSlice'
import { RootState } from '../..'
import './index.css'
import AddPost from '../AddPost'
import IAppBar from '../../interfaces/IAppBar'

const ApplicationBar:FC<IAppBar> = ({ setUpdated }) => {
  const [open, setOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state:RootState) => state.authenticationSlice)

  const handleLogout = ():void => {
    dispatch(removeUser(logout()))
    navigate('/')
  }

  const handleOpen = ():void => setOpen(true)
  const handleClose = ():void => setOpen(false)

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
            <IconButton onClick={() => navigate(`/users/${user?.id}`)}>
              {' '}
              <Article />
            </IconButton>
            <IconButton onClick={handleOpen}>
              <Create />
            </IconButton>
          </div>
          <AddPost
            open={open}
            handleClose={handleClose}
            setOpen={setOpen}
            setUpdated={setUpdated}
          />

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
