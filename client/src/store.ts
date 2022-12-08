import { configureStore } from '@reduxjs/toolkit'
import ToastMiddleware from './middlewares/ToastMiddleware'
import authenticationSlice from './slices/authenticationSlice'
import blogSlice from './slices/blogsSlice'
import loadingSlice from './slices/loadingSlice'

export const store = configureStore({
  reducer: {
    authenticationSlice,
    blogSlice,
    loadingSlice,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware),
})
