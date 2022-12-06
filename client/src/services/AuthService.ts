import axiosConfig from './ApiService'
import JwtService from './JwtService'
import { logUser, signUser } from '../slices/authenticationSlice'

const register = async (dispatch:Function, credentials:object)
:Promise<{isLogged: boolean, err:any } > => {
  try {
    const response = await axiosConfig.post('/api/v1/auth/signup', credentials)
    if (response.statusText === 'OK') {
      JwtService.set(response.data.token)
      dispatch(signUser(response.data))
    }
    return { isLogged: true, err: null }
  } catch (error:any) {
    return { isLogged: false, err: error }
  }
}

const login = async (dispatch:Function, credentials: object)
:Promise<{isLogged: boolean, err:any } > => {
  try {
    const response = await axiosConfig.post('/api/v1/auth/login', credentials)
    if (response.statusText === 'OK') {
      JwtService.set(response.data.token)
      dispatch(logUser(response.data))
    }
    return { isLogged: true, err: null }
  } catch (error:any) {
    return { isLogged: false, err: error }
  }
}

const logout = ():object => {
  JwtService.clear()
  return { message: 'User is Logged out' }
}

export {
  register, login, logout,
}
