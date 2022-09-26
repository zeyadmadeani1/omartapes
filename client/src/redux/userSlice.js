import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser:null,
loading:false,
error:false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart:(state)=>
        {
            state.loading=true
        
        },        loginSuccess:(state,action)=>
        {
            state.loading=false
            state.currentUser=action.payload
        
        },        loginFailure:(state)=>
        {
            state.loading=false
            state.error=false
        
        },
        changeName:(state,action)=>
        {
            state.currentUser.name=action.payload
        }
        ,        logOut:(state)=>
        {
     return initialState
        },
        subscription:(state,action)=>
        {

            if(state.currentUser.subscribedUsers.includes(action.payload))
            {
                
                state.currentUser.subscribedUsers.splice
                (
                    state.currentUser.subscribedUsers.findIndex(
                        channelId=>channelId===action.payload
                    )
                )
            }
            else 
        {
            state.currentUser.subscribedUsers.push(action.payload)
        }

        }
    },    image:(state,action)=>
    {
     state.currentUser.Img=action.payload
    }

  })
  export const { loginStart,changeName,image,loginSuccess, loginFailure,logOut,subscription } = userSlice.actions

export default userSlice.reducer