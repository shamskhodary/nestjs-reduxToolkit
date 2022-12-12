import { FC } from 'react'
import { Box } from '@mui/system'
import {
  Button, Modal, TextField, Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import IAddPost from '../../interfaces/IAddPost'
import postSchema from '../../validation/addPostSchema'
import axiosConfig from '../../services/ApiService'
import { addPost } from '../../slices/blogsSlice'
import IAddPostProps from '../../interfaces/props/IAddPostProps'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 700,
  bgcolor: 'white',
  border: '1px solid #333',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
}

const AddPost:FC<IAddPostProps> = (
  {
    open, handleClose, setOpen, setUpdated,
  },
) => {
  const dispatch = useDispatch()
  const { isLogged } = useSelector((state:any) => state.authenticationSlice)
  const navigate = useNavigate()

  const handleAddPosts = async (values:IAddPost):Promise<void> => {
    try {
      const response = await axiosConfig.post('/api/v1/posts', { ...values })
      if (response) {
        dispatch(addPost(response.data.data))
        setUpdated(true)
        toast.success(response.data.message)
        setOpen(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const initialValues = {
    title: '',
    content: '',
    image: '',
  }

  const formik = useFormik({
    initialValues,
    validationSchema: postSchema,
    onSubmit: (values, { resetForm }) => {
      if (isLogged) {
        handleAddPosts(values)
        resetForm()
      } else {
        navigate('/signup')
      }
    },
  })
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={formik.handleSubmit}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Draft
            </Typography>
            <div className="inputs">
              <TextField
                id="filled-basic"
                variant="filled"
                size="small"
                placeholder="Title"
                name="title"
                sx={{ width: '100%' }}
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
              <TextField
                fullWidth
                multiline
                name="content"
                placeholder="Tell your story..."
                InputProps={{
                  rows: 10,
                }}
                value={formik.values.content}
                onChange={formik.handleChange}
                error={formik.touched.content && Boolean(formik.errors.content)}
                helperText={formik.touched.content && formik.errors.content}
                sx={{ width: '100%' }}
              />
              <TextField
                id="outlined-required"
                variant="outlined"
                size="small"
                fullWidth
                name="image"
                label="Image"
                value={formik.values.image}
                onChange={formik.handleChange}
                error={formik.touched.image && Boolean(formik.errors.image)}
                helperText={formik.touched.image && formik.errors.image}
              />

              <Button
                sx={{
                  textTransform:
               'lowercase',
                  color: '#fff',
                  backgroundColor: '#1a8917',
                  borderRadius: '50px',
                  fontSize: '13px',
                  fontWeight: '600',
                  bottom: 15,
                  right: 25,
                  position: 'absolute',
                }}
                type="submit"
              >
                Publish

              </Button>
            </div>

          </Box>
        </form>
      </Modal>
    </div>
  )
}

export default AddPost
