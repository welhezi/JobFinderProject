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
