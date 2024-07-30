import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchGradovi = createAsyncThunk(
  "cities/fetchGradovi",
  async () => {
    const response = await api.get("/gradovi");
    console.log(response.data);
    return response.data;
  }
);
