import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setContent: (state, action) => {
      state.value = action.payload
    }
  },
})

export const { setContent } = mainSlice.actions

export default mainSlice.reducer