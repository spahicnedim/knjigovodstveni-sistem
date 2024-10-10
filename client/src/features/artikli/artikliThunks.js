import { createAsyncThunk } from '@reduxjs/toolkit';
import api from "../../api/api";

export const createArtikli = createAsyncThunk(
    "artikli/createArtikli",
    async (artikliData, thunkAPI) => {
        try {
            const response = await api.post("/artikli", artikliData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const fetchArtikli = createAsyncThunk(
    "artikli/fetchArtikli",
    async (poslovniceId, thunkAPI) => {
        try {
            const response = await api.get(`/artikli?poslovniceId=${poslovniceId}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);