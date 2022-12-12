import { FC } from 'react'
import moment from 'moment'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { Avatar, Box, Typography } from '@mui/material'
import { HighlightOff } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import IPostProps from '../../interfaces/props/IPostsProp'
import axiosConfig from '../../services/ApiService'
import { deletePost } from '../../slices/blogsSlice'

const BlogLists:FC<IPostProps> = ({ post, setDeleted }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLogged } = useSelector((state:any) => state.authenticationSlice)

  const handleOnePost = ():void => {
    if (isLogged) {
      navigate(`/posts/${post.id}`)
    } else {
      navigate('/signup')
    }
  }

  const handleDeletePost = async (id:number):Promise<void> => {
    const response = await axiosConfig.delete(`/api/v1/posts/${id}`)
    if (response.data.message === 'post deleted successfully') {
      dispatch(deletePost(id))
      setDeleted(true)
    }
  }

  return (
    <Box className="post">
      <div className="post-owner">
        <Avatar src={post.user?.image} />
        <Typography sx={{ paddingLeft: '0.5rem' }}>{post.user?.username}</Typography>
      </div>
      <span>{moment(post.createdAt).format('YYYY/MM/DD kk:mm:ss')}</span>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          cursor: 'pointer',
          marginTop: '1rem',
        }}
        onClick={handleOnePost}
      >
        <div className="post-content">
          <h4>{post.title}</h4>
          <p>{post.content}</p>

        </div>
        <div className="post-image">
          <img src={post.image} alt="post" />
        </div>
      </Box>
      {user?.id === post.userId && (
      <HighlightOff
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          handleDeletePost(post.id)
        }}
      />
      )}

    </Box>
  )
}

export default BlogLists
