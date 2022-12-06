import { configureStore } from '@reduxjs/toolkit'
import ToastMiddleware from './middlewares/ToastMiddleware'
import authenticationSlice from './slices/authenticationSlice'

export const store = configureStore({
  reducer: {
    authenticationSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware),
})
