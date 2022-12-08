import { FC } from 'react'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import {
  Button, TextField, InputLabel, Select, MenuItem, SelectChangeEvent,
} from '@mui/material'
import { register } from '../../services/AuthService'
import { signUser } from '../../slices/authenticationSlice'

const Signup:FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const validationSchema = yup.object({
    username: yup.string().min(3).required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string()
      .min(6, 'Password should be of minimum 6 characters length')
      .required('Password is required'),
    gender: yup.string().required('Gender is required'),
  })

  const handleSubmit = async (values:object):Promise<void> => {
    const userInfo = await register(values)
    if (userInfo.isLogged === true) {
      dispatch(signUser(userInfo.data))
      navigate('/')
    } else {
      toast(userInfo.err.response.data.message)
    }
  }

  const formik = useFormik({
    initialValues: {
      username: '', email: '', password: '', gender: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <div className="signup-form">
      <h2 style={{ display: 'block', margin: '15px 0' }}>
        sign up
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          type="text"
          label="username"
          variant="outlined"
          size="small"
          name="username"
          placeholder="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <br />
        <TextField
          type="email"
          name="email"
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
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          defaultValue=""
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Gender"
          error={formik.touched.gender && Boolean(formik.errors.gender)}
          value={formik.values.gender}
          onChange={(e: SelectChangeEvent) => {
            formik.setValues({ ...formik.values, gender: e.target.value as string })
          }}
        >
          <MenuItem
            id="male"
            value="male"
          >
            Male
          </MenuItem>
          <MenuItem
            value="female"
            id="female"
          >
            Female

          </MenuItem>
        </Select>
        <br />
        <Button variant="outlined" type="submit">create an account</Button>

      </form>
    </div>
  )
}

export default Signup
