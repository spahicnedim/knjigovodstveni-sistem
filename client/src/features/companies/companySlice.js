import { createSlice } from "@reduxjs/toolkit";
import {
  createCompany,
  fetchCompanies,
  fetchoneCompany,
  fetchGradovi,
  updateCompany,
  createRacun,
  fetchRacuni,
  fetchDrzave,
} from "./companyThunks";

const companySlice = createSlice({
  name: "company",
  initialState: {
    companies: [],
    current: null,
    gradovi: [],
    racuni: [],
    drzave: [],
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
      .addCase(fetchGradovi.fulfilled, (state, action) => {
        state.gradovi = action.payload;
        state.status = "succeeded";
      })
      .addCase(createRacun.fulfilled, (state, action) => {
        state.racuni.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(fetchRacuni.fulfilled, (state, action) => {
        state.racuni = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchDrzave.fulfilled, (state, action) => {
        state.drzave = action.payload;
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
      .addCase(fetchGradovi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createRacun.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRacuni.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDrzave.pending, (state) => {
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
      .addCase(fetchGradovi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(createRacun.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(fetchRacuni.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(fetchDrzave.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export default companySlice.reducer;
