import { configureStore } from '@reduxjs/toolkit'
import authenticationSlice from './slices/authenticationSlice'

export const store = configureStore({
  reducer: {
    authenticationSlice,
  },
})
