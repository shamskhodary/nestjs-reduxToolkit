import { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../..'
import BlogLists from './BlogLists'

const BlogContainer:FC<{setDeleted: Function}> = ({ setDeleted }) => {
  const { posts } = useSelector((state:RootState) => state.blogSlice)

  //! fix re-rendering

  return (
    <div className="blog-container">
      {posts?.length && posts.map((post:any) => (
        <BlogLists
          post={post}
          key={post.id}
          setDeleted={setDeleted}
        />
      ))}
    </div>
  )
}

export default BlogContainer
