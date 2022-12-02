import { FC, useEffect, useState } from 'react'
import IPosts from '../../interfaces/IPost'
import axiosConfig from '../../services/ApiService'
import Blog from './Blog'

const BlogContainer:FC = () => {
  const [data, setData] = useState<IPosts[]>([])

  const handlePosts = async ():Promise<void> => {
    const posts = await axiosConfig.get('/api/v1/posts')
    if (posts && posts.data) setData(posts.data)
  }
  useEffect(() => {
    handlePosts()
  }, [])
  return (
    <div className="blog-container">
      {data && data.map((post:any) => <Blog post={post} key={post.id} />)}
    </div>
  )
}

export default BlogContainer
