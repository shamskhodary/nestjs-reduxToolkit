import { configureStore } from '@reduxjs/toolkit'
import ToastMiddleware from './middlewares/ToastMiddleware'
import authenticationSlice from './slices/authenticationSlice'
import blogsSlice from './slices/blogsSlice'

export const store = configureStore({
  reducer: {
    authenticationSlice,
    blogsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware),
})
