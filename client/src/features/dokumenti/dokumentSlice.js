import { createSlice } from "@reduxjs/toolkit";
import {
    createDokument,
} from "./dokumentThunks.js";


const dokumentSlice = createSlice({
    name: "dokument",
    initialState: {
        current: null,
        dokumenti: [],
        error: null,
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createDokument.fulfilled, (state, action) => {
                state.gradovi.push(action.payload);
                state.status = "succeeded";
            })

    },
});

export default dokumentSlice.reducer;