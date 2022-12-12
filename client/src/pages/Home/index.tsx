import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogContainer from '../../components/Blogs/BlogContainer'
import ApplicationBar from '../../components/AppBar'
import { RootState } from '../..'
import Navbar from '../../components/Navbar'
import axiosConfig from '../../services/ApiService'
import { getAllPosts } from '../../slices/blogsSlice'

const Home:FC<{ updated:boolean, setUpdated:Function,
  deleted: boolean, setDeleted: Function

 }> = ({
   updated, setUpdated, deleted, setDeleted,
 }) => {
   const { isLogged, user } = useSelector((state:RootState) => state.authenticationSlice)
   const dispatch = useDispatch()

   const handlePosts = async ():Promise<void> => {
     const response = await axiosConfig.get('/api/v1/posts', {
       params: {
         userId: user?.id,
       },
     })
     if (response.data) {
       dispatch(getAllPosts(response.data))
     }
   }
   useEffect(() => {
     handlePosts()
   }, [updated, deleted])

   return (
     <div className="homepage">
       {isLogged ? <ApplicationBar setUpdated={setUpdated} /> : <Navbar />}
       <BlogContainer setDeleted={setDeleted} />
     </div>
   )
 }

export default Home
