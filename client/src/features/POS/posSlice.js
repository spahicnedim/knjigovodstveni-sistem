import { createSlice } from '@reduxjs/toolkit';
import {submitPOS} from "./posThunks.js";

const posSlice = createSlice({
    name: 'pos',
    initialState: {
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(submitPOS.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(submitPOS.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(submitPOS.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default posSlice.reducer;