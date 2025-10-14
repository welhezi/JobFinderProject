import { createSlice } from "@reduxjs/toolkit"
import { loginAction, registerAction } from "../actions/userAction"

const initialState = {
    currentUser : null,
    isFetching : false,
    error : false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{},
    extraReducers : (builder) => {
    builder
    .addCase(registerAction.pending,(state)=>
        {
        state.isFetching=true
        state.error=null
        })
    .addCase(registerAction.fulfilled,(state,{payload})=>
        {
        state.isFetching=false
        state.error=null
        state.currentUser=payload
        })
    .addCase(registerAction.rejected,(state,{payload})=>
    {
    state.isFetching=false
    state.error=payload
    })

    // login
    .addCase(loginAction.pending,(state)=>
        {
        state.isFetching=true
        state.error=null
        })
    .addCase(loginAction.fulfilled,(state,{payload})=>
        {
        state.isFetching=false
        state.error=null
        state.currentUser=payload
        })
    .addCase(loginAction.rejected,(state,{payload})=>
    {
    state.isFetching=false
    state.error=payload
    })




        }
})

export default userSlice.reducer