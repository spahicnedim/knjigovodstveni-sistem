import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchvrstaSkladista = createAsyncThunk(
    "vrstaSkladista/fetchvrstaSkladista",
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/vrstaSkladista");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
