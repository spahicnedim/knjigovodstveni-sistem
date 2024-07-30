import { createSlice } from "@reduxjs/toolkit";
import {
  createCompany,
  fetchCompanies,
  fetchoneCompany,
  fetchGradovi,
  updateCompany,
  createRacun,
  fetchRacuni,
} from "./companyThunks";

const companySlice = createSlice({
  name: "company",
  initialState: {
    companies: [],
    current: null,
    gradovi: [],
    racuni: [],
    error: null,
    status: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCompany.fulfilled, (state, action) => {
        state.companies.push(action.payload);
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        const index = state.companies.findIndex(
          (company) => company.id === action.payload.id
        );
        if (index !== -1) {
          state.companies[index] = action.payload;
        }
      })
      .addCase(fetchoneCompany.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.companies = action.payload;
      })
      .addCase(fetchGradovi.fulfilled, (state, action) => {
        state.gradovi = action.payload;
      })
      .addCase(createRacun.fulfilled, (state, action) => {
        state.racuni.push(action.payload);
      })
      .addCase(fetchRacuni.fulfilled, (state, action) => {
        state.racuni = action.payload;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith("companies/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("companies/") &&
          action.type.endsWith("/fulfilled"),
        (state) => {
          state.status = "succeeded";
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("companies/") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.error; // Use action.error instead of action.payload for error details
        }
      );
  },
});

export default companySlice.reducer;
