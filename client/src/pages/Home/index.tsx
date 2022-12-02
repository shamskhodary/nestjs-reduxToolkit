import { FC } from 'react'
import BlogContainer from '../../components/Blog/BlogContainer'
import Navbar from '../../components/Navbar'

const Home:FC = () => (
  <div className="homepage">
    <Navbar />
    <BlogContainer />
  </div>
)

export default Home
