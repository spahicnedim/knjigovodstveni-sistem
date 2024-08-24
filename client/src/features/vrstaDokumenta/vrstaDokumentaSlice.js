import { createSlice } from "@reduxjs/toolkit";
import {
    fetchVrstaDokumenta,
} from "./vrstaDokumentaThunks.js";


const vrstaDokumentaSlice = createSlice({
    name: "vrstaDokumenta",
    initialState: {
        current: null,
        vrsteDokumenata: [],
        error: null,
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVrstaDokumenta.fulfilled, (state, action) => {
                state.vrsteDokumenata = action.payload;
                state.status = "succeeded";
            })

    },
});

export default vrstaDokumentaSlice.reducer;