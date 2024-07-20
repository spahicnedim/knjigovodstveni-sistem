import { createSlice } from "@reduxjs/toolkit";
import { createService, fetchServiceById, fetchServices } from "./serviceThunk";

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    services: [],
    current: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createService.fulfilled, (state, action) => {
        state.error = null;
      })
      .addCase(createService.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        // const index = state.services.findIndex(
        //   (service) => service.id === action.payload.id
        // );
        // if (index === -1) {
        //   state.services.push(action.payload);
        // } else {
        //   state.services[index] = action.payload;
        // }
        state.current = action.payload;
      });
  },
});

export const { setCurrentServiceId } = serviceSlice.actions;
export default serviceSlice.reducer;
