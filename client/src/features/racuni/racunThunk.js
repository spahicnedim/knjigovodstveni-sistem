import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const createRacun = createAsyncThunk(
  "cities/createRacun",
  async (racunData, thunkAPI) => {
    try {
      const response = await api.post("/racun", racunData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchRacuni = createAsyncThunk(
  "racun/fetchRacuni",
  async (companyId, thunkAPI) => {
    try {
      const response = await api.get(`/racun/${companyId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteRacun = createAsyncThunk(
  "racun/deleteRacun",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/racun/${id}`);

      return { id };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
