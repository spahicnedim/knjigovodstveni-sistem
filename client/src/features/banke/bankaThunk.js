import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../api/api.jsx";

export const fetchBanke = createAsyncThunk("banka/fetchBanke", async () => {
    const response = await api.get("/banke");
    console.log(response.data);
    return response.data;
});