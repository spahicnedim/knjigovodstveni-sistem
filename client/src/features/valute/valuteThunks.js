import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const createValute = createAsyncThunk(
    "valuta/createValute",
    async (valutaData, thunkAPI) => {
        try {
            const response = await api.post("/valuta", valutaData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const fetchValuta = createAsyncThunk(
    "valuta/fetchValuta",
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/valuta");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);