import { createSlice } from "@reduxjs/toolkit";
import {
  createCompany,
  fetchCompanies,
  fetchoneCompany,
  fetchGradovi,
} from "./companyThunks";

const companySlice = createSlice({
  name: "company",
  initialState: {
    companies: [],
    current: null,
    gradovi: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCompany.fulfilled, (state, action) => {
        state.companies.push(action.payload);
        state.error = null;
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.companies = action.payload;
        state.error = null;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchoneCompany.fulfilled, (state, action) => {
        state.current = action.payload;
        state.error = null;
      })
      .addCase(fetchoneCompany.rejected, (state, action) => {
        state.error = action.payload;
      })
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

export default companySlice.reducer;
