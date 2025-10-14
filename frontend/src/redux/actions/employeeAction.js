import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

export const registerEmployeeAction = createAsyncThunk(
    "employee/add",
    async (FormData,{rejectWithValue}) => {
        try {
            const res = await axios.post("http://localhost:5000/employee/add",FormData)
            console.log("response",res.data)
            return res.data
        } catch (error) {
            return rejectWithValue(error.res.data.message)
        }
    }


)