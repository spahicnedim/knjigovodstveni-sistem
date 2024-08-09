import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../api/api.jsx";

export const fetchDrzave = createAsyncThunk("drzava/fetchDrzave", async () => {
    const response = await api.get("/drzava");
    console.log(response.data);
    return response.data;
});

export const createDrzava = createAsyncThunk(
    "drzave/createDrzava",
    async (drzavaData, thunkAPI) => {
        try {
            const response = await api.post("/drzava", drzavaData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);