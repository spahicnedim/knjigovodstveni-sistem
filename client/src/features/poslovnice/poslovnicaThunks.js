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
    async (companyId, thunkAPI) => {
        try {
            const response = await api.get("/poslovnice", {
                params: {companyId}
            });
            return response.data.poslovnice;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
