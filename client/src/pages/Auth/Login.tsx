import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { TextField, Button } from '@mui/material'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { login } from '../../services/AuthService'

const Login:FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string()
      .min(6, 'Password should be of minimum 6 characters length')
      .required('Password is required'),
  })

  const handleSubmit = async (values:{email: string, password: string}):Promise<void> => {
    const userInfo = await login(dispatch, values)
    if (userInfo.isLogged === true) {
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
      </form>
    </div>
  )
}

export default Login
