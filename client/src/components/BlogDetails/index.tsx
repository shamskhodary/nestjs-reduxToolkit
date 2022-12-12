import { FC, useEffect } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { SignLanguageOutlined, ModeComment, BookmarkAdd } from '@mui/icons-material'

import {
  Avatar, Box, Stack, Typography,
} from '@mui/material'
import { toast } from 'react-toastify'
import axiosConfig from '../../services/ApiService'
import { getOnePost } from '../../slices/blogsSlice'
import { RootState } from '../../index'

const BlogDetails:FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { one } = useSelector((state:RootState) => state.blogSlice)

  useEffect(() => {
    const singlePost = async ():Promise<void> => {
      try {
        const response = await axiosConfig.get(`/api/v1/posts/${id}`)
        if (response.status === 200) {
          dispatch(getOnePost(response.data))
        }
      } catch (err:any) {
        toast.error(err)
      }
    }
    singlePost()
  }, [dispatch])
  return (
    <div>
      <Box>
        <Stack direction="row" spacing={2}>
          <Avatar src="img">H</Avatar>
        </Stack>
        <div>
          <Typography onClick={() => navigate(`users/${one?.userId}`)}>
            {one?.user.username}
          </Typography>
          <span>{moment(one?.createdAt).format('YYYY/MM/DD')}</span>
        </div>

        <div className="details">
          <Typography variant="h1">{one?.title}</Typography>
          <img src={one?.image} alt="postImage" />
          <Typography variant="body2">{one?.content}</Typography>
        </div>
        <div className="icons">
          <SignLanguageOutlined />
          <ModeComment />
          <BookmarkAdd />
        </div>
      </Box>
    </div>
  )
}

export default BlogDetails
