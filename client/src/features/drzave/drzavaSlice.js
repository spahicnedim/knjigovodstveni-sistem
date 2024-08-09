import { createSlice } from "@reduxjs/toolkit";
import {
    fetchDrzave,
    createDrzava,
} from "./DrzavaThunk.js";

const drzavaSlice = createSlice({
    name: "drzava",
    initialState: {
        current: null,
        drzave: [],
        error: null,
        status: null,
    },
    extraReducers: (builder) => {
        builder
            // Fulfilled

            .addCase(fetchDrzave.fulfilled, (state, action) => {
                state.drzave = action.payload;
                state.status = "succeeded";
            })
            .addCase(createDrzava.fulfilled, (state, action) => {
                state.drzave.push(action.payload);
                state.status = "succeeded";
            })
            // Pending

            .addCase(fetchDrzave.pending, (state) => {
                state.status = "loading";
            })

            .addCase(fetchDrzave.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error;
            })

    },
});

export default drzavaSlice.reducer;
