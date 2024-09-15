import { createSlice } from "@reduxjs/toolkit";
import {
    fetchActiveGodina,
    fetchAllGodine
} from "./godineThunks.js";

const godineSlice = createSlice({
    name: "godina",
    initialState: {
        current: null,
        godina: null,
        godine: [],
        error: null,
        status: null,
    },
    extraReducers: (builder) => {
        builder
            // Fulfilled

            .addCase(fetchActiveGodina.fulfilled, (state, action) => {
                state.godina = action.payload;
                state.status = "succeeded";
            })

            .addCase(fetchActiveGodina.pending, (state) => {
                state.status = "loading";
            })

            .addCase(fetchActiveGodina.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error;
            })
            .addCase(fetchAllGodine.fulfilled, (state, action) => {
                state.godine = action.payload;
                state.status = "succeeded";
            })

    },
});

export default godineSlice.reducer;
