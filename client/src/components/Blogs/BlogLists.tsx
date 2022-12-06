import { FC } from 'react'
import moment from 'moment'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import IPostProps from '../../interfaces/props/IPostsProp'

const BlogLists:FC<IPostProps> = ({ post }) => {
  const navigate = useNavigate()

  const handleOnePost = ():void => {
    navigate(`/posts/${post.id}`)
  }
  return (
    <Box className="post" onClick={handleOnePost}>
      <div className="post-image">
        <img src={post.image} alt="post" />
        <span>{moment(post.createdAt).format('YYYY/MM/DD kk:mm:ss')}</span>
      </div>
      <h4>{post.title}</h4>
      <p>{post.content}</p>

    </Box>
  )
}

export default BlogLists
