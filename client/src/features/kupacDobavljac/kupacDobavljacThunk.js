import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const createKupacDobavljac = createAsyncThunk(
    "kupacDobavljac/createKupacDobavljac",
    async (kupacDobavljacData, thunkAPI) => {
        try {
            const response = await api.post("/kupacDobavljac", kupacDobavljacData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


export const updateKupacDobavljac = createAsyncThunk(
    "kupacDobavljac/updateKupacDobavljac",
    async ({ id, kupacDobavljacData }, thunkAPI) => {
        try {
            const response = await api.put(`/kupacDobavljac/${id}`, kupacDobavljacData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const fetchKupciDobavljaci = createAsyncThunk(
    "kupciDobavljaci/fetchKupciDobavljaci",
    async (companyId, thunkAPI) => {
        try {
            const response = await api.get("/kupacDobavljac", {
                params: { companyId }
            });
            return response.data.kupciDobavljaci;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


