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
