import { createSlice } from "@reduxjs/toolkit";
import { createRacun, fetchRacuni, deleteRacun } from "./racunThunk";

const racunSlice = createSlice({
  name: "racun",
  initialState: {
    racuni: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRacuni.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRacuni.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.racuni = action.payload.racuni;
      })
      .addCase(fetchRacuni.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createRacun.fulfilled, (state, action) => {
        state.racuni.push(action.payload.racun);
      })
      .addCase(deleteRacun.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (racun) => racun.id !== action.payload.id
        );
      });
  },
});

export default racunSlice.reducer;
