import * as yup from 'yup'

const signupSchema = yup.object({
  username: yup.string().min(3).required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
  gender: yup.string().required('Gender is required'),
})

export default signupSchema
