import { createSlice } from "@reduxjs/toolkit"
import { loginAction, logoutAction, registerAction } from "../actions/userAction"

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
    /*.addCase(loginAction.fulfilled,(state,action)=>
        {
        state.isFetching=false
        state.error=null
        state.currentUser=action.payload
        localStorage.setItem("accessToken",action.payload.accessToken)
        localStorage.setItem("refreshToken",action.payload.refreshToken)
        })*/
    .addCase(loginAction.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.currentUser = payload;
        localStorage.setItem("accessToken", payload.accessToken);
        localStorage.setItem("refreshToken", payload.refreshToken);
      })
    .addCase(loginAction.rejected,(state,{payload})=>
    {
    state.isFetching=false
    state.error=payload
    })

    //logout
    .addCase(logoutAction.pending,(state)=>
        {
        state.isFetching=true
        state.error=null
        })
    .addCase(logoutAction.fulfilled,(state)=>
        {
        state.isFetching=false
        state.error=null
        state.currentUser = null
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        })
    .addCase(logoutAction.rejected,(state,{payload})=>
    {
    state.isFetching=false
    state.error=payload
    })




}
})

export default userSlice.reducer