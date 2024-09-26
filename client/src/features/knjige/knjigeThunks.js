import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../api/api.jsx";

export const fetchKnjige = createAsyncThunk(
    "knjige/fetchKnjige",
    async ({knjigeId, companyId}, thunkAPI) => {
        try {
            const response = await api.get(`/knjige/${knjigeId}`, {
                params: {companyId}
            });
            return response.data.knjiga;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);