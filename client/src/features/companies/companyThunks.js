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
  async ({ serviceId, companyId }, thunkAPI) => {
    try {
      const response = await api.get(`/companies/${serviceId}/${companyId}`);
      console.log(response.data);
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

export const updateCompany = createAsyncThunk(
  "companies/updateCompany",
  async ({ companyId, companyData }, thunkAPI) => {
    try {
      const response = await api.put(`/companies/${companyId}`, companyData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

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
      const response = await api.post(`/racun/${companyId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchDrzave = createAsyncThunk("drzava/fetchDrzave", async () => {
  const response = await api.get("/drzava");
  console.log(response.data);
  return response.data;
});

export const fetchBanke = createAsyncThunk("banka/fetchBanke", async () => {
  const response = await api.get("/banke");
  console.log(response.data);
  return response.data;
});

export const createGrad = createAsyncThunk(
  "gradovi/createGrad",
  async (gradData, thunkAPI) => {
    try {
      const response = await api.post("/gradovi", gradData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createDrzava = createAsyncThunk(
  "drzave/createDrzava",
  async (drzavaData, thunkAPI) => {
    try {
      const response = await api.post("/drzava", drzavaData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
