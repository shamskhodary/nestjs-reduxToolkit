import { createSlice } from '@reduxjs/toolkit'
import { IPostState } from '../interfaces/IPost'

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
    deletePost: (state, action) => {
      state.posts?.splice(action.payload, 1)
    }
    ,
  },
})

export const {
  addPost, getOnePost, editPost, getAllPosts, deletePost,
} = blogSlice.actions

export default blogSlice.reducer
