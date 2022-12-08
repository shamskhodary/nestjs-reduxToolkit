import { createSlice } from '@reduxjs/toolkit'
import { IPostState } from '../interfaces/IPost'
//! alert
const initialState: IPostState = {
  posts: null,
  one: null,
}

const blogSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getAllPosts: (state, action) => {
      state.posts = action.payload
    },
    getOnePost: (state, action) => {
      state.posts = null
      state.one = action.payload
    },
    addPost: (state, action) => {
      state.posts?.push(action.payload)
    },
    editPost: () => {},
    // deletePost: (state, action) => {
    //   const deleted = state.posts?.filter((post:any) => post.id !== action.payload.id)
    //   state.posts = deleted
    // },
  },
})

export const {
  addPost, getOnePost, editPost, getAllPosts,
} = blogSlice.actions

export default blogSlice.reducer
