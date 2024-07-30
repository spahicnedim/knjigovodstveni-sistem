import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const createCompany = createAsyncThunk(
  "companies/createCompany",
  async (companyData, thunkAPI) => {
    try {
      const response = await api.post("/companies", companyData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies",
  async (serviceId, thunkAPI) => {
    try {
      const response = await api.get(`/companies/${serviceId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchoneCompany = createAsyncThunk(
  "companies/fetchOneCompany",
  async ({ serviceId, id }, thunkAPI) => {
    try {
      const response = await api.get(`/companies/${serviceId}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchGradovi = createAsyncThunk(
  "cities/fetchGradovi",
  async () => {
    const response = await api.get("/gradovi");
    console.log(response.data);
    return response.data;
  }
);
