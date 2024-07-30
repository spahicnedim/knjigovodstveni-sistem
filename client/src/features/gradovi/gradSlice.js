import { createSlice } from "@reduxjs/toolkit";
import { fetchGradovi } from "./gradThunk";

const gradSlice = createSlice({
  name: "grad",
  initialState: {
    gradovi: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGradovi.fulfilled, (state, action) => {
        state.loading = false;
        state.gradovi = action.payload;
      })
      .addCase(fetchGradovi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default gradSlice.reducer;
