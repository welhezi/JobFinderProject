import { createSlice } from "@reduxjs/toolkit"
import { registerEmployeeAction } from "../actions/employeeAction"


const initialState = {
    currentUser : null,
    isFetching : false,
    error : false
}

const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers:{},
    extraReducers : (builder) => {
    builder
    .addCase(registerEmployeeAction.pending,(state)=>
        {
        state.isFetching=true
        state.error=null
        })
    .addCase(registerEmployeeAction.fulfilled,(state,{payload})=>
        {
        state.isFetching=false
        state.error=null
        state.currentUser=payload
        })
    .addCase(registerEmployeeAction.rejected,(state,{payload})=>
    {
    state.isFetching=false
    state.error=payload
    })



        }
})

export default employeeSlice.reducer