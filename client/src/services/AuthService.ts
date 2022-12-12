import axiosConfig from './ApiService'
import JwtService from './JwtService'

const register = async (credentials:object)
:Promise<{isLogged: boolean, err:any, data: any } > => {
  try {
    const response = await axiosConfig.post('/api/v1/auth/signup', credentials)
    if (response.statusText === 'OK') {
      JwtService.set(response.data.token)
      axiosConfig.setHeaders()
    }
    return { isLogged: true, err: null, data: response.data }
  } catch (error:any) {
    return { isLogged: false, err: error, data: {} }
  }
}

const login = async (credentials: object)
:Promise<{isLogged: boolean, err:any, data: any } > => {
  try {
    const response = await axiosConfig.post('/api/v1/auth/login', credentials)
    if (response.statusText === 'OK') {
      JwtService.set(response.data.token)
      axiosConfig.setHeaders()
    }
    return { isLogged: true, err: null, data: response.data }
  } catch (error:any) {
    return { isLogged: false, err: error, data: {} }
  }
}

const logout = ():object => {
  JwtService.clear()
  return { message: 'User is Logged out' }
}

export {
  register, login, logout,
}
