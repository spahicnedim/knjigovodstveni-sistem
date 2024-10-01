import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const createDokumentKalkulacije = createAsyncThunk(
  "dokumenti/createDokumentKalkulacije",
  async (dokumentData, thunkAPI) => {
    try {
      const response = await api.post("/dokument/kalkulacije", dokumentData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createDokumentFakture = createAsyncThunk(
    "dokumenti/createDokumentFakture",
    async (dokumentData, thunkAPI) => {
        try {
            const response = await api.post("/dokument/fakture", dokumentData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log(dokumentData)
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

export const updateDokumentKalkulacije = createAsyncThunk(
  "dokumenti/updateDokumentKalkulacije",
  async ({ dokumentId, formData }, thunkAPI) => {
    try {
      const response = await api.put(`/dokument/kalkulacije/${dokumentId}`, formData, {
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

export const updateDokumentFakture = createAsyncThunk(
    "dokumenti/updateDokumentFakture",
    async ({ dokumentId, formData }, thunkAPI) => {
        try {
            const response = await api.put(`/dokument/fakture/${dokumentId}`, formData, {
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

export const deleteDokument = createAsyncThunk(
    "dokumenti/deleteDokument",
    async (dokumentId, thunkAPI) => {
        try {
            const response = await api.delete(`/dokument/kalkulacije/${dokumentId}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deleteDokumentFakture = createAsyncThunk(
    "dokumenti/deleteDokumentFakture",
    async (dokumentId, thunkAPI) => {
        try {
            const response = await api.delete(`/dokument/fakture/${dokumentId}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
