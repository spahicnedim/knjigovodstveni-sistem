import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData, thunkAPI) => {
    try {
      const response = await api.post("/users", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/users");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// export const fetchUserCompanies = createAsyncThunk(
//   "users/fetchUserCompanies",
//   async ({ userId, rejectWithValue }) => {
//     try {
//       console.log("Fetching companies for userId:", userId);
//       const response = await api.get(`/users/${userId}/companies`);
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       console.log("Error fetching companies:", error);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
