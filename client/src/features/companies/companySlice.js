import { createSlice } from "@reduxjs/toolkit";
import {
  createCompany,
  fetchCompanies,
  fetchoneCompany,
  updateCompany,
} from "./companyThunks";

const companySlice = createSlice({
  name: "company",
  initialState: {
    companies: [],
    current: null,
    error: null,
    status: null,
  },
  extraReducers: (builder) => {
    builder
      // Fulfilled
      .addCase(createCompany.fulfilled, (state, action) => {
        state.companies.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        const index = state.companies.findIndex(
          (company) => company.id === action.payload.id
        );
        if (index !== -1) {
          state.companies[index] = action.payload;
        }
        state.status = "succeeded";
      })
      .addCase(fetchoneCompany.fulfilled, (state, action) => {
        state.current = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.companies = action.payload;
        state.status = "succeeded";
      })
      // Pending
      .addCase(createCompany.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCompany.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchoneCompany.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCompanies.pending, (state) => {
        state.status = "loading";
      })
      // Rejected
      .addCase(createCompany.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(fetchoneCompany.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
  },
});

export default companySlice.reducer;
