import { FC } from 'react'
import moment from 'moment'
import './index.css'
import IPostProps from '../../interfaces/props/IPostsProp'

const Blog:FC<IPostProps> = ({ post }) => (
  <div className="post">
    <div className="post-image">
      <img src={post.image} alt="post" />
      <span>{moment(post.createdAt).format('YYYY/MM/DD kk:mm:ss')}</span>
    </div>
    <h4>{post.title}</h4>
    <p>{post.content}</p>

  </div>
)

export default Blog
