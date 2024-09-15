import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../api/api.jsx";

export const fetchActiveGodina = createAsyncThunk("godine/fetchActiveGodina", async () => {
    const response = await api.get("/godine");
    console.log(response.data);
    return response.data;
});

export const fetchAllGodine = createAsyncThunk("godine/fetchAllGodine", async () => {
    const response = await api.get("/godine/all");
    return response.data;
});