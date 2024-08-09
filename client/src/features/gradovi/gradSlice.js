import { createSlice } from "@reduxjs/toolkit";
import {
    fetchGradovi,
    createGrad,
} from "./gradThunk.js";


const gradSlice = createSlice({
    name: "grad",
    initialState: {
        current: null,
        gradovi: [],
        error: null,
        status: null,
    },
    extraReducers: (builder) => {
        builder
            // Fulfilled

            .addCase(fetchGradovi.fulfilled, (state, action) => {
                state.gradovi = action.payload;
                state.status = "succeeded";
            })
            .addCase(createGrad.fulfilled, (state, action) => {
                state.gradovi.push(action.payload);
                state.status = "succeeded";
            })
            .addCase(fetchGradovi.pending, (state) => {
                state.status = "loading";
            })

            .addCase(fetchGradovi.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error;
            })

    },
});

export default gradSlice.reducer;