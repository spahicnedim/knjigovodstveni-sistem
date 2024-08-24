import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const createSkladiste = createAsyncThunk(
    "skladista/createSkladiste",
    async (skladisteData, thunkAPI) => {
        try {
            const response = await api.post("/skladiste", skladisteData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const fetchSkladista = createAsyncThunk(
    "skladista/fetchSkladista",
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/skladiste");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);