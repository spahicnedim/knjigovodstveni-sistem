import { createSlice } from "@reduxjs/toolkit";
import {
    createPoslovnica,
} from "./poslovnicaThunks.js";


const poslovnicaSlice = createSlice({
    name: "poslovnica",
    initialState: {
        current: null,
        poslovnice: [],
        error: null,
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPoslovnica.fulfilled, (state, action) => {
                state.gradovi.push(action.payload);
                state.status = "succeeded";
            })

    },
});

export default poslovnicaSlice.reducer;