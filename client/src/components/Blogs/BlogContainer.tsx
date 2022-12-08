import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../..'
import axiosConfig from '../../services/ApiService'
import { getAllPosts } from '../../slices/blogsSlice'
import { loadingData } from '../../slices/loadingSlice'
import BlogLists from './BlogLists'

const BlogContainer:FC = () => {
  const dispatch = useDispatch()
  const { posts } = useSelector((state:RootState) => state.blogSlice)
  //! fix re-rendering

  const handlePosts = async ():Promise<void> => {
    const response = await axiosConfig.get('/api/v1/posts')
    if (response.data) {
      dispatch(getAllPosts(response.data))
      dispatch(loadingData())
    }
  }
  useEffect(() => {
    handlePosts()
  }, [dispatch])

  return (
    <div className="blog-container">
      {posts && posts.map((post:any) => (
        <BlogLists
          post={post}
          key={post.id}
        />
      ))}
    </div>
  )
}

export default BlogContainer
