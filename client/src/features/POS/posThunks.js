import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api.jsx';

// Thunk za slanje POS podataka na backend
export const submitPOS = createAsyncThunk('pos/submit', async (posData, { rejectWithValue }) => {
    try {
        console.log("Slanje POS podataka na backend:", posData);
        const response = await api.post('/pos/submit', posData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});