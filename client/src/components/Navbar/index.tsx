import { Typography, Box } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'

const Navbar:FC = () => (
  <header>
    <Box className="list">
      <Link to="/signup"><Typography>Signup</Typography></Link>
      <Link to="/login"><Typography>Login</Typography></Link>
    </Box>

  </header>
)

export default Navbar
