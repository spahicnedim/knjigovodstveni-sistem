import { createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  fetchUsers,
  assignUserToCompany,
  removeUserFromCompany,
} from "./userThunk";

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
      })
      .addCase(assignUserToCompany.fulfilled, (state, action) => {
        const { userId, companyId } = action.payload;
        const user = state.users.find((user) => user.id === userId);
        if (user) {
          user.companies.push(companyId);
        }
        state.error = null;
      })
      .addCase(assignUserToCompany.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeUserFromCompany.fulfilled, (state, action) => {
        const { userId, companyId } = action.payload;
        const user = state.users.find((user) => user.id === userId);
        if (user) {
          user.companies = user.companies.filter((id) => id !== companyId);
        }
        state.error = null;
      })
      .addCase(removeUserFromCompany.rejected, (state, action) => {
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
