import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchGradovi = createAsyncThunk(
    "cities/fetchGradovi",
    async () => {
        const response = await api.get("/gradovi");
        console.log(response.data);
        return response.data;
    }
);

export const createGrad = createAsyncThunk(
    "gradovi/createGrad",
    async (gradData, thunkAPI) => {
        try {
            const response = await api.post("/gradovi", gradData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
