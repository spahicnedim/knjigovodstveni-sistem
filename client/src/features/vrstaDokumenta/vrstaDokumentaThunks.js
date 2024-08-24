import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchVrstaDokumenta = createAsyncThunk(
    "vrstaDokumenta/fetchVrstaDokumenta",
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/vrstaDokumenta");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
