import * as yup from 'yup'

const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
})

export default loginSchema
