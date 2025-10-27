import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




export const getApplicationsByPostIdAction = createAsyncThunk(
  "apps/getbypostid",
  async (id, { rejectWithValue }) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return rejectWithValue("No access token found");

    try {
      const res = await axios.get(
        `http://localhost:5000/app/get/${id}`,{ headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log(" apps data : ", res.data.data);
      return res.data.data; 
    } catch (error) {
      console.error("Axios error :", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);



export const getAppDetailsByIdAction = createAsyncThunk(
  "apps/getbyid",
  async (id, { rejectWithValue }) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return rejectWithValue("No access token found");

    try {
      const res = await axios.get(
        `http://localhost:5000/app/getbyid/${id}`,{ headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log(" app data : ", res.data.data);
      return res.data.data; 
    } catch (error) {
      console.error("Axios error :", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
