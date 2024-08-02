import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const createOrUpdateDjelatnost = createAsyncThunk(
  "cities/createRacun",
  async (djelatnostData, thunkAPI) => {
    try {
      const response = await api.post("/djelatnost", djelatnostData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchDjelatnostByCompanyId = createAsyncThunk(
  "djelatnost/fetchByCompanyId",
  async (companyId, thunkAPI) => {
    try {
      const response = await api.get(`/djelatnost/company/${companyId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchDjelatnosti = createAsyncThunk(
  "djelatnosti/fetchDjelatnosti",
  async () => {
    const response = await api.get("/djelatnost");
    return response.data;
  }
);
