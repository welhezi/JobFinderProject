import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { setCurrentUser } from "../slices/userSlice";

export const registerEmployeeAction = createAsyncThunk(
    "employee/add",
    async (FormData,{rejectWithValue}) => {
        try {
            const res = await axios.post(
                "http://localhost:5000/employee/add",
                FormData, 
                {headers: { "Content-Type": "multipart/form-data" }}
            )
            console.log("response",res.data)
            return res.data
        } catch (error) {
            return rejectWithValue(error.res.data.message)
        }
    }
)

export const updateEmployeeAction = createAsyncThunk(
  "employee/update",
  async (updatedData, { rejectWithValue }) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return rejectWithValue("No access token found");
    try {
      //const token = localStorage.getItem("token"); 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axios.put(
        `http://localhost:5000/employee/${updatedData.get("id")}`, 
        updatedData,
        config
      );
      //dispatch(setCurrentUser(response.data));
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
