import { FC } from 'react'
import moment from 'moment'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { Avatar, Box, Typography } from '@mui/material'
import IPostProps from '../../interfaces/props/IPostsProp'

const BlogLists:FC<IPostProps> = ({ post }) => {
  const navigate = useNavigate()
  const handleOnePost = ():void => {
    navigate(`/posts/${post.id}`)
  }
  return (
    <Box className="post">
      <div className="post-owner">
        <Avatar src={post.user?.image} />
        <Typography>{post.user?.username}</Typography>
        <span>{moment(post.createdAt).format('YYYY/MM/DD kk:mm:ss')}</span>
      </div>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
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

    </Box>
  )
}

export default BlogLists
