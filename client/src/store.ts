import { configureStore } from '@reduxjs/toolkit'
import ToastMiddleware from './middlewares/ToastMiddleware'
import authenticationSlice from './slices/authenticationSlice'
import blogSlice from './slices/blogsSlice'

export const store = configureStore({
  reducer: {
    authenticationSlice,
    blogSlice,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware),
})
