import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const createPoslovnica = createAsyncThunk(
    "poslovnice/createPoslovnica",
    async (poslovnicaData, thunkAPI) => {
        try {
            const response = await api.post("/poslovnice", poslovnicaData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const fetchPoslovnice = createAsyncThunk(
    "poslovnice/fetchPoslovnice",
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/poslovnice");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
