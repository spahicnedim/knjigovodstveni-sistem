import { createSlice } from "@reduxjs/toolkit";
import { login, register, fetchUserCompanies } from "./authThunks";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    companies: [],
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
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
        console.log("Login fulfilled:", state.user);
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        console.log("Login rejected:", state.error);
      })
      .addCase(fetchUserCompanies.fulfilled, (state, action) => {
        state.companies = action.payload;
        state.error = null;
      })
      .addCase(fetchUserCompanies.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
