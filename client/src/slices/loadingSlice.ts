import { createSlice } from '@reduxjs/toolkit'

interface loadingState {
  loading: boolean
}

const initialState: loadingState = {
  loading: false,
}
const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    loadingData: (state) => {
      state.loading = !state.loading
    },
  },
})

export const {
  loadingData,
} = loadingSlice.actions

export default loadingSlice.reducer
