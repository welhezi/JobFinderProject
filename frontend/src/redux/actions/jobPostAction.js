import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getAllJobPostsAction = createAsyncThunk(
  "jobPosts/get",
  async (_, { rejectWithValue }) => {
    //const accessToken = localStorage.getItem("accessToken");
    //if (!accessToken) return rejectWithValue("No access token found");

    try {
      const res = await axios.get(
        "http://localhost:5000/jobpost/get",
        //{ headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log("new data ", res.data.data);
      return res.data.data; // ✅ tableau des posts
    } catch (error) {
      console.error("Axios error :", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);



export const getAllPostsOfEmployeeAction = createAsyncThunk(
  "jobPosts/getbyidEmployee",
  async (id_employee, { rejectWithValue }) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return rejectWithValue("No access token found");

    try {
      const res = await axios.get(
        `http://localhost:5000/jobpost/getbyIdEmployee/${id_employee}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log("new data ", res.data.data);
      return res.data.data; // ✅ tableau des posts
    } catch (error) {
      console.error("Axios error :", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);




export const AddNewJobPostAction = createAsyncThunk(
  "jobPosts/add",
  async (formData, { rejectWithValue }) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return rejectWithValue("No access token found");

    const {title,description,mission,requirements,endDate,location,id_employee} = formData

    try {
      const res = await axios.post(
        "http://localhost:5000/jobpost/add",formData,{ headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log("add data ", res.data.data);
      return res.data.data; 
    } catch (error) {
      console.error("Axios error :", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);



export const getJobPostDetailsAction = createAsyncThunk(
  "jobPosts/getbyid",
  async (id, { rejectWithValue }) => {
    //const accessToken = localStorage.getItem("accessToken");
    //if (!accessToken) return rejectWithValue("No access token found");

    try {
      const res = await axios.get(
        `http://localhost:5000/jobpost/get/${id}`,
        //{ headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log(" post details : ", res.data.data);
      return res.data.data; 
    } catch (error) {
      console.error("Axios error :", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const delJobPostAction = createAsyncThunk(
  "jobPosts/delbyid",
  async (id, { rejectWithValue }) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return rejectWithValue("No access token found");

    try {
      const res = await axios.delete(
        `http://localhost:5000/jobpost/del/${id}`,{ headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log(" del post : ", res.data.data);
      return res.data.data; 
    } catch (error) {
      console.error("Axios error :", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);



export const updateJobPostAction = createAsyncThunk(
  "jobPosts/update",
  async ({ id, data }, { rejectWithValue }) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return rejectWithValue("No access token found");

    try {
      const res = await axios.put(
        `http://localhost:5000/jobpost/update/${id}`, data,{ headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log("Updated post:", res.data.jobPost);
      return res.data.jobPost; // retourne le post mis à jour
    } catch (error) {
      console.error("Axios update error:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);