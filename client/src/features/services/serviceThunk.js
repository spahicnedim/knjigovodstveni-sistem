import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const createService = createAsyncThunk(
  "services/createService",
  async (serviceData, thunkAPI) => {
    try {
      const response = await api.post("/services", serviceData);
      console.log("Create Service Response:", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/services");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchServiceById = createAsyncThunk(
  "services/getById",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/services/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
