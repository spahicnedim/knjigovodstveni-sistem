import { createSlice } from "@reduxjs/toolkit";
import {
    fetchvrstaSkladista
} from "./vrstaSkladistaThunks.js";


const vrstaSkladistaSlice = createSlice({
    name: "vrstaSkladista",
    initialState: {
        current: null,
        vrsteSkladista: [],
        error: null,
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchvrstaSkladista.fulfilled, (state, action) => {
                state.vrsteSkladista = action.payload;
                state.status = "succeeded";
            })

    },
});

export default vrstaSkladistaSlice.reducer;