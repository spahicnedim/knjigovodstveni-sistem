import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const createDokument = createAsyncThunk(
    "dokumenti/createDokument",
    async (dokumentData, thunkAPI) => {
        try {
            const response = await api.post("/dokument", dokumentData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const fetchPdv = createAsyncThunk(
    "pdv/fetchPdv",
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/pdv");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const fetchDokumenti = createAsyncThunk(
    "dokumenti/fetchDokumenti",
    async (skladisteId, thunkAPI) => {
        try {
            const response = await api.get("/dokument", {
                params: { skladisteId }
            });
            return response.data.dokumenti;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
