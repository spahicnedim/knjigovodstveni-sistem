import { createSlice } from "@reduxjs/toolkit";
import {
    createKupacDobavljac,
    updateKupacDobavljac,
    fetchKupciDobavljaci
} from "./kupacDobavljacThunk.js";

const kupacDobavljacSlice = createSlice({
    name: "kupacDobavljac",
    initialState: {
        kupciDobavljaci: [],
        current: null,
        error: null,
        status: null,
    },
    extraReducers: (builder) => {
        builder
            // Fulfilled
            .addCase(createKupacDobavljac.fulfilled, (state, action) => {
                state.kupciDobavljaci.push(action.payload);
                state.status = "succeeded";
            })
            .addCase(updateKupacDobavljac.fulfilled, (state, action) => {
                const index = state.kupciDobavljaci.findIndex(
                    (kupacDobavljac) => kupacDobavljac.id === action.payload.id
                );
                if (index !== -1) {
                    state.kupciDobavljaci[index] = action.payload;
                }
                state.status = "succeeded";
            })

            // Pending
            .addCase(createKupacDobavljac.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateKupacDobavljac.pending, (state) => {
                state.status = "loading";
            })

            // Rejected
            .addCase(createKupacDobavljac.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error;
            })
            .addCase(updateKupacDobavljac.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error;
            })
            .addCase(fetchKupciDobavljaci.fulfilled, (state, action) => {
                state.loading = false;
                state.kupciDobavljaci = action.payload;
            })

    },
});

export default kupacDobavljacSlice.reducer;
