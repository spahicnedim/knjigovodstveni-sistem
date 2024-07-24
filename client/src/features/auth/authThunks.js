import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import Cookies from "js-cookie";

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await api.post("/auth/login", userData);
      const token = Cookies.get("token");
      thunkAPI.dispatch(fetchRoles());
      return { user: response.data, token };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserCompanies = createAsyncThunk(
  "users/fetchUserCompanies",
  async (userId, { rejectWithValue }) => {
    try {
      console.log("Fetching companies for userId:", userId);
      const response = await api.get(`/users/${userId}/companies`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching companies:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchRoles = createAsyncThunk(
  "auth/fetchRoles",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/roles");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
