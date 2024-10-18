import { createSlice } from "@reduxjs/toolkit";
import {
    createArtikli,
    fetchArtikli,
    fetchSkladisteArtikli
} from "./artikliThunks.js";


const artikliSlice = createSlice({
    name: "artikl",
    initialState: {
        current: null,
        artikli: [],
        error: null,
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createArtikli.fulfilled, (state, action) => {
                state.artikli.push(action.payload);
                state.status = "succeeded";
            })
            .addCase(fetchArtikli.fulfilled, (state, action) => {
                state.artikli = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchSkladisteArtikli.fulfilled, (state, action) => {
                state.artikli = action.payload;
                state.status = "succeeded";
            })

    },
});

export default artikliSlice.reducer;