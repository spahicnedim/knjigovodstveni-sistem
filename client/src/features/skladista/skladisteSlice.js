import { createSlice } from "@reduxjs/toolkit";
import {
    createSkladiste,
} from "./skladisteThunks.js";


const skladisteSlice = createSlice({
    name: "skladiste",
    initialState: {
        current: null,
        skladista: [],
        error: null,
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createSkladiste.fulfilled, (state, action) => {
                state.skladista.push(action.payload);
                state.status = "succeeded";
            })

    },
});

export default skladisteSlice.reducer;