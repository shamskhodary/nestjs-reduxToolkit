import { createSlice } from '@reduxjs/toolkit'
import { IPostState } from '../interfaces/IPost'

const initialState:IPostState = {
  posts: null,
}

const blogSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPost: () => {},
    getOnePost: (state, action) => {
      state.posts = action.payload
    },
    editPost: () => {},
    deletePost: () => {},
  },
})

export const {
  addPost, getOnePost, editPost, deletePost,
} = blogSlice.actions

export default blogSlice.reducer
