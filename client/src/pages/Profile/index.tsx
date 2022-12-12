import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { RootState } from '../..'
import axiosConfig from '../../services/ApiService'
import { getUser } from '../../slices/authenticationSlice'
import { getAllPosts } from '../../slices/blogsSlice'
import BlogContainer from '../../components/Blogs/BlogContainer'
import ApplicationBar from '../../components/AppBar'

const Profile:FC<{updated: boolean,
   setUpdated:Function,
   setDeleted: Function
  }> = ({ updated, setUpdated, setDeleted }) => {
    const { user } = useSelector((state:RootState) => state.authenticationSlice)
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
      const userProfile = async ():Promise<void> => {
        const response = await axiosConfig.get(`api/v1/users/${id}`)
        if (response.status === 200) {
          dispatch(getUser(response.data))
        } else {
          toast.error(response.data.message)
        }
      }
      userProfile()
    }, [dispatch])

    useEffect(() => {
      const handlePosts = async ():Promise<void> => {
        const response = await axiosConfig.get('/api/v1/posts', {
          params: {
            userId: id,
          },
        })
        if (response.data) {
          dispatch(getAllPosts(response.data))
        }
      }
      handlePosts()
    }, [id, updated])

    return (
      <div>
        <ApplicationBar setUpdated={setUpdated} />
        <Typography sx={{
          textAlign: 'center',
          marginTop: '1rem',
          fontSize: '1.5rem',
          fontWeight: '600',
        }}
        >

          {' '}
          {user?.username}
          &apos;s

          blogs
        </Typography>
        {id && <BlogContainer setDeleted={setDeleted} />}
      </div>
    )
  }

export default Profile
