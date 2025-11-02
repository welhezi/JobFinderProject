import { createSlice } from "@reduxjs/toolkit"
import { getApplicationsByPostIdAction, updateAppAction } from "../actions/applicationAction"

const initialState = {
    apps : [],
    isFetching : false,
    error : false
}


const applicationSlice = createSlice({
    name: "applications",
    initialState,
    reducers:{},
    extraReducers : (builder) => {
    builder
    .addCase(getApplicationsByPostIdAction.pending,(state)=>
        {
        state.isFetching=true
        state.error=null
        })
    .addCase(getApplicationsByPostIdAction.fulfilled,(state,{payload})=>
        {
        state.isFetching=false
        state.error=null
        state.apps=payload
        })
    .addCase(getApplicationsByPostIdAction.rejected,(state,{payload})=>
    {
    state.isFetching=false
    state.error=payload
    })


    //update 
    .addCase(updateAppAction.pending,(state)=>
        {
        state.isFetching=true
        state.error=null
        })
    .addCase(updateAppAction.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.error = null;

        // Vérifie que state.apps est bien un tableau
        if (Array.isArray(state.apps)) {
            const index = state.apps.findIndex(app => app._id === payload._id);
            if (index !== -1) {
            state.apps[index] = payload; // on met à jour seulement cette application
            }
        }
        })

    .addCase(updateAppAction.rejected,(state,{payload})=>
    {
    state.isFetching=false
    state.error=payload
    })

}
})

export default applicationSlice.reducer