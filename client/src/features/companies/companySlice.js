import { createSlice } from "@reduxjs/toolkit";
import {
  createCompany,
  fetchCompanies,
  fetchoneCompany,
} from "./companyThunks";

const companySlice = createSlice({
  name: "company",
  initialState: {
    companies: [],
    current: null,
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
      });
  },
});

export default companySlice.reducer;
