import { createSlice } from "@reduxjs/toolkit"
import { getAllJobPostsAction, getJobPostDetailsAction } from "../actions/jobPostAction"

const initialState = {
    jobPost : [],
    isFetching : false,
    error : false
}


const jobPostSlice = createSlice({
    name: "jobPosts",
    initialState,
    reducers:{},
    extraReducers : (builder) => {
    builder
    
    //tous les jobs
    .addCase(getAllJobPostsAction.pending,(state)=>
        {
        state.isFetching=true
        state.error=null
        })
    .addCase(getAllJobPostsAction.fulfilled,(state,{payload})=>
        {
        state.isFetching=false
        state.error=null
        state.jobPost=payload
        })
    .addCase(getAllJobPostsAction.rejected,(state,{payload})=>
    {
    state.isFetching=false
    state.error=payload
    })


    //Détails d’un job
      .addCase(getJobPostDetailsAction.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(getJobPostDetailsAction.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.selectedJob = payload;
      })
      .addCase(getJobPostDetailsAction.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      });

}
})

export default jobPostSlice.reducer