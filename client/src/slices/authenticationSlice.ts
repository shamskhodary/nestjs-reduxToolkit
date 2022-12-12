import { createSlice } from '@reduxjs/toolkit'
import { IUserState } from '../interfaces/IUser'

const initialState: IUserState = {
  user: null,
  isLogged: false,
  error: '',
}
const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    userAuthenticated: (state, action) => {
      state.user = action.payload
      state.isLogged = true
    },
    signUser: (state, action) => {
      state.user = action.payload
      state.isLogged = true
    },
    logUser: (state, action) => {
      state.user = action.payload
      state.isLogged = true
    },
    removeUser: (state, action) => {
      state.user = null
      state.isLogged = false
      state.error = action.payload
    },
    getUser: (state, action) => {
      state.user = action.payload
      state.isLogged = true
    },
  },
})

export const {
  userAuthenticated, signUser, logUser, removeUser, getUser,
} = authenticationSlice.actions

export default authenticationSlice.reducer
