import { createSlice } from "@reduxjs/toolkit"
import { registerEmployeeAction, updateEmployeeAction } from "../actions/employeeAction"


const initialState = {
    currentUser : null,
    isFetching : false,
    error : false
}

const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers:{
        // 🔹 Nouvelle action pour mettre à jour le currentUser
       /* setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },*/
    },
    extraReducers : (builder) => {
    builder

    //add
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


    // 🔹 Update employee
    .addCase(updateEmployeeAction.pending, (state) => {
        state.isFetching = true;
        state.error = null;
    })
    .addCase(updateEmployeeAction.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.error = null;
        state.currentUser = payload; // mettre à jour l'utilisateur
    })
    .addCase(updateEmployeeAction.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
    })






}
})

//export const { setCurrentUser } = employeeSlice.actions;
export default employeeSlice.reducer