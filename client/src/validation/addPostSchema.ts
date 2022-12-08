import * as yup from 'yup'

const postSchema = yup.object({
  title: yup.string().min(5).required(),
  content: yup.string().required(),
  image: yup.string().required(),
})

export default postSchema
