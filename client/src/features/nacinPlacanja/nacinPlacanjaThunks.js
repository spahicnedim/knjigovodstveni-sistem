import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const createNacinPlacanja = createAsyncThunk(
    "nacinPlacanja/createNacinPlacanja",
    async (nacinPlacanjaData, thunkAPI) => {
        try {
            const response = await api.post("/nacinPlacanja", nacinPlacanjaData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const fetchNacinPlacanja = createAsyncThunk(
    "nacinPlacanja/fetchNacinPlacanja",
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/nacinPlacanja");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);