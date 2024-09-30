import { createSlice } from "@reduxjs/toolkit";
import {
    createNacinPlacanja,
    fetchNacinPlacanja
} from "./nacinPlacanjaThunks.js";


const valutaSlice = createSlice({
    name: "nacinPlacanja",
    initialState: {
        current: null,
        naciniPlacanja: [],
        error: null,
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNacinPlacanja.fulfilled, (state, action) => {
                state.naciniPlacanja.push(action.payload);
                state.status = "succeeded";
            })
            .addCase(fetchNacinPlacanja.fulfilled, (state, action) => {
                state.naciniPlacanja = action.payload;
                state.status = "succeeded";
            })

    },
});

export default valutaSlice.reducer;