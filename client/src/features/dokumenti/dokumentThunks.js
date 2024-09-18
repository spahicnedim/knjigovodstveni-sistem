import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const createDokument = createAsyncThunk(
  "dokumenti/createDokument",
  async (dokumentData, thunkAPI) => {
    try {
      const response = await api.post("/dokument", dokumentData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchPdv = createAsyncThunk(
  "pdv/fetchPdv",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/pdv");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchDokumenti = createAsyncThunk(
  "dokumenti/fetchDokumenti",
  async ({ skladisteId, godineId, vrstaDokumentaId }, thunkAPI) => {
    try {
      const response = await api.get("/dokument", {
        params: { skladisteId, godineId, vrstaDokumentaId },
      });
      return response.data.dokumenti;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchDokumentiById = createAsyncThunk(
  "dokumenti/fetchDokumentiById",
  async (dokumentId, thunkAPI) => {
    try {
      const response = await api.get(`/dokument/${dokumentId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateDokument = createAsyncThunk(
  "dokumenti/updateDokument",
  async ({ dokumentId, formData }, thunkAPI) => {
    try {
      const response = await api.put(`/dokument/${dokumentId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
