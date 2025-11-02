import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

export const registerAction = createAsyncThunk(
    "user/register",
    async (FormData,{rejectWithValue}) => {
        try {
            const res = await axios.post("http://localhost:5000/user/register",FormData)
            return res.data
        } catch (error) {
            return rejectWithValue(error.res.data.message)
        }
    }


)


export const loginAction = createAsyncThunk(
    "user/login",
    async (FormData,{rejectWithValue}) => {
        try {
            const res = await axios.post("http://localhost:5000/user/login",FormData)
            return res.data
        } catch (error) {
            return rejectWithValue(error.res.data.message)
        }
    }


)


export const logoutAction = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token found");

      const res = await axios.post("http://localhost:5000/user/logout", { refreshToken });
      console.log("user log out was successful")
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const getAllmployeesAction = createAsyncThunk(
  "user/getEmployees",
  async (_, { rejectWithValue }) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return rejectWithValue("No access token found");

    try {
      const res = await axios.get(
        "http://localhost:5000/user/getEmployees",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log("employees : ", res.data.data);
      return res.data.data; 
    } catch (error) {
      console.error("Axios error :", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);



export const delEmployeeAction = createAsyncThunk(
  "user/delbyid",
  async (id, { rejectWithValue }) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return rejectWithValue("No access token found");

    try {
      const res = await axios.delete(
        `http://localhost:5000/user/del/${id}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log(" deleted employee : ", res.data.data);
      return res.data.data; 
    } catch (error) {
      console.error("Axios error :", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


//update 
export const updateUserAction = createAsyncThunk(
  "user/updateProfile",
  async ({ id, formData }, { rejectWithValue }) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return rejectWithValue("No access token found");

    try {
      formData.append("id", id);

      const res = await axios.put(
        `http://localhost:5000/user/updateUserProfile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Updated user:", res.data.data);
      return res.data.data;
    } catch (error) {
      console.error("Axios error:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

