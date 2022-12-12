import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TextField, Button, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { login } from '../../services/AuthService'
import { logUser } from '../../slices/authenticationSlice'
import validationSchema from '../../validation/loginSchema'

const Login:FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (values:{email: string, password: string}):Promise<void> => {
    const userInfo = await login(values)
    if (userInfo.isLogged === true) {
      dispatch(logUser(userInfo.data.user))
      navigate('/')
    } else {
      toast.error(userInfo.err.response.data.message)
    }
  }

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: handleSubmit,
  })
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          type="email"
          name="email"
          id="email"
          label="email"
          size="small"
          variant="outlined"
          placeholder="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{ display: 'block', margin: '15px 0' }}
        />
        <TextField
          name="password"
          id="password"
          label="password"
          variant="outlined"
          size="small"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{ display: 'block', margin: '15px 0' }}
        />
        <Button variant="outlined" type="submit">Log in</Button>
        <Typography>
          you are new here?
          {' '}
          <Link to="/signup">Sign up now</Link>
        </Typography>
      </form>
    </div>
  )
}

export default Login
