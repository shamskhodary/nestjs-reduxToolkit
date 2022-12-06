import { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../..'
import ApplicationBar from '../../components/AppBar'

const SearchResults:FC = () => {
  const { user } = useSelector((state:RootState) => state.authenticationSlice)

  return (
    <>
      <ApplicationBar image={user?.image} />
      <div style={{ textAlign: 'center' }}>
        search page
      </div>
    </>

  )
}

export default SearchResults
