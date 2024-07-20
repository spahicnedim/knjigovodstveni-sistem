import { createSlice } from "@reduxjs/toolkit";
import { createUser, fetchUsers } from "./userThunk";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    companies: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload;
      });
    // .addCase(fetchUserCompanies.fulfilled, (state, action) => {
    //   state.companies = action.payload;
    //   state.error = null;
    // })
    // .addCase(fetchUserCompanies.rejected, (state, action) => {
    //   state.error = action.payload;
    // });
  },
});

export default userSlice.reducer;
