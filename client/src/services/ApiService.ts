import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import JwtService from './JwtService'

export default class axiosConfig {
  private static axios = axios

  public static init():void {
    this.axios.defaults.baseURL = process.env.REACT_APP_BASE_URL
    this.axios.interceptors.response.use((response) => response, (err) => {
      if (err?.response?.status >= 400 && err?.response?.status < 500
        && err?.response?.status !== 401 && err.config.url !== '/api/v1/users/me') {
        toast.error(err?.response?.data?.message)
      }
      return Promise.reject(err)
    })
  }

  public static setHeaders():void {
    this.axios.defaults.headers.Authorization = `Bearer ${JwtService.get()}`
    this.axios.defaults.headers.common['Content-Type'] = 'application/json'
    this.axios.defaults.headers.common.Accept = 'application/json'
  }

  public static get(route:string, config?:AxiosRequestConfig)
  :Promise<AxiosResponse> {
    return this.axios.get(route, config)
  }

  public static post(route:string, data:object, config?:AxiosRequestConfig)
  :Promise<AxiosResponse> {
    return this.axios.post(route, data, config)
  }

  public static patch(route:string, data:object, config?:AxiosRequestConfig)
  :Promise<AxiosResponse> {
    return this.axios.patch(route, data, config)
  }

  public static delete(route:string, config?:AxiosRequestConfig)
  :Promise<AxiosResponse> {
    return this.axios.delete(route, config)
  }
}
