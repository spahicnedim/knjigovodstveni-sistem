import { createSlice } from '@reduxjs/toolkit';
import { fetchKnjige } from './knjigeThunks';

const knjigeSlice = createSlice({
    name: 'knjige',
    initialState: {
        knjiga: null,       // Sprema podatke o trenutno dohvaćenoj knjizi
        loading: false,     // Stanje učitavanja
        error: null,        // Stanje greške
    },
    reducers: {
        // Ovdje možeš dodati druge sinhrone akcije ako je potrebno
    },
    extraReducers: (builder) => {
        // Thunk za dohvaćanje knjige po ID-u
        builder
            .addCase(fetchKnjige.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchKnjige.fulfilled, (state, action) => {
                state.loading = false;
                state.knjiga = action.payload;
            })
            .addCase(fetchKnjige.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default knjigeSlice.reducer;