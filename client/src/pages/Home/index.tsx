import { FC } from 'react'
import { useSelector } from 'react-redux'
import BlogContainer from '../../components/Blogs/BlogContainer'
import ApplicationBar from '../../components/AppBar'
import { RootState } from '../..'
import Navbar from '../../components/Navbar'

const Home:FC = () => {
  const { isLogged, user } = useSelector((state:RootState) => state.authenticationSlice)

  return (
    <div className="homepage">
      {isLogged ? <ApplicationBar image={user?.image} /> : <Navbar />}
      <BlogContainer />
    </div>
  )
}

export default Home
