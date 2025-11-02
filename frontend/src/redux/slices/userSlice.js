import { createSlice } from "@reduxjs/toolkit"
import { delEmployeeAction, getAllmployeesAction, loginAction, logoutAction, registerAction, updateUserAction } from "../actions/userAction"

const initialState = {
    currentUser : null,
    employees : [],
    isFetching : false,
    error : false
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
    },
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

//getallEmployees
    .addCase(getAllmployeesAction.pending,(state)=>
        {
        state.isFetching=true
        state.error=null
        })
    .addCase(getAllmployeesAction.fulfilled,(state,{payload})=>
        {
        state.isFetching=false
        state.error=null
        state.employees=payload
        })
    .addCase(getAllmployeesAction.rejected,(state,{payload})=>
    {
    state.isFetching=false
    state.error=payload
    })

    //delete
    .addCase(delEmployeeAction.pending,(state)=>
        {
        state.isFetching=true
        state.error=null
        })
    .addCase(delEmployeeAction.fulfilled,(state,{payload})=>
        {
        state.isFetching=false
        state.error=null
        state.employees=payload
        })
    .addCase(delEmployeeAction.rejected,(state,{payload})=>
    {
    state.isFetching=false
    state.error=payload
    })

    //update
    .addCase(updateUserAction.pending,(state)=>
        {
        state.isFetching=true
        state.error=null
        })
    .addCase(updateUserAction.fulfilled,(state,action)=>
        {
        if (state.currentUser) {
          state.currentUser.user = action.payload;
        }
        state.isFetching=false
        state.error=null
        
        })
    .addCase(updateUserAction.rejected,(state,{payload})=>
    {
    state.isFetching=false
    state.error=payload
    })










}
})

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer