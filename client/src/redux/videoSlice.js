import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentVideo:null,
}

export const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
          fetchSuccess: (state, action) => {
            state.currentVideo = action.payload;
          },

        like:(state,action)=>
        {
            if(!state.currentVideo.likes.includes(action.payload))
            {
                state.currentVideo.likes.push(action.payload)
                state.currentVideo.dislikes.pop
                (
                    state.currentVideo.dislikes.findIndex(userId=>userId===action.payload)
                )
            }

        },
        dislike:(state,action)=>
        {
            if(!state.currentVideo.dislikes.includes(action.payload))
            {
                state.currentVideo.dislikes.push(action.payload)
                state.currentVideo.likes.pop
                (
                    state.currentVideo.dislikes.findIndex(userId=>userId===action.payload)
                )
            }
      
        }
    }
  })
  export const { fetchSuccess,like,dislike} = videoSlice.actions

export default videoSlice.reducer