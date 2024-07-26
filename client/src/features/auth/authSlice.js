import { createSlice } from "@reduxjs/toolkit";
import { login, register, fetchUserCompanies, fetchRoles } from "./authThunks";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    companies: [],
    roles: [],
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.companies = [];
      state.roles = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchUserCompanies.fulfilled, (state, action) => {
        state.companies = action.payload;
        state.error = null;
      })
      .addCase(fetchUserCompanies.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.roles = action.payload;
        state.error = null;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase("RESET", (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.companies = [];
        state.roles = [];
        state.error = null;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
