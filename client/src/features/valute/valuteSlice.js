import { createSlice } from "@reduxjs/toolkit";
import {
    createValute,
    fetchValuta
} from "./valuteThunks.js";


const valutaSlice = createSlice({
    name: "valuta",
    initialState: {
        current: null,
        valute: [],
        error: null,
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createValute.fulfilled, (state, action) => {
                state.valute.push(action.payload);
                state.status = "succeeded";
            })
            .addCase(fetchValuta.fulfilled, (state, action) => {
                state.valute = action.payload;
                state.status = "succeeded";
            })

    },
});

export default valutaSlice.reducer;