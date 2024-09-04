import { createSlice } from "@reduxjs/toolkit";
import {
    createDokument, fetchDokumenti,
    fetchPdv
} from "./dokumentThunks.js";


const dokumentSlice = createSlice({
    name: "dokument",
    initialState: {
        current: null,
        dokumenti: [],
        pdv: [],
        error: null,
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createDokument.fulfilled, (state, action) => {
                state.dokumenti.push(action.payload);
                state.status = "succeeded";
            })
            .addCase(fetchPdv.fulfilled, (state, action) => {
                state.loading = false;
                state.pdv = action.payload;
            })
            .addCase(fetchDokumenti.fulfilled, (state, action) => {
                state.dokumenti = action.payload;
                state.status = "succeeded";
            })

    },
});

export default dokumentSlice.reducer;