import { createSlice } from "@reduxjs/toolkit"
import { getApplicationsByPostIdAction } from "../actions/applicationAction"

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

}
})

export default applicationSlice.reducer