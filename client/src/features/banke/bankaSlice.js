import { createSlice } from "@reduxjs/toolkit";
import {
    fetchBanke,
} from "./bankaThunk.js";

const bankaSlice = createSlice({
    name: "banka",
    initialState: {
        current: null,
        banke: [],
        error: null,
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBanke.fulfilled, (state, action) => {
                state.banke = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchBanke.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBanke.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error;
            });
    },
});

export default bankaSlice.reducer;
