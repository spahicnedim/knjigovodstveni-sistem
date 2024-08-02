import { createSlice } from "@reduxjs/toolkit";
import {
  createOrUpdateDjelatnost,
  fetchDjelatnostByCompanyId,
  fetchDjelatnosti,
} from "./djelatnostThunk";

const djelatnostSlice = createSlice({
  name: "djelatnost",
  initialState: {
    djelatnosti: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrUpdateDjelatnost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrUpdateDjelatnost.fulfilled, (state, action) => {
        state.loading = false;
        state.djelatnosti = action.payload;
      })
      .addCase(createOrUpdateDjelatnost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // .addCase(fetchDjelatnostByCompanyId.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.djelatnosti = action.payload;
      // })
      // .addCase(fetchDjelatnostByCompanyId.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // })
      .addCase(fetchDjelatnosti.fulfilled, (state, action) => {
        state.loading = false;
        state.djelatnosti = action.payload;
      })
      .addCase(fetchDjelatnosti.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default djelatnostSlice.reducer;
