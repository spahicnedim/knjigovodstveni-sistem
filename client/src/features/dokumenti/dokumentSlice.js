import { createSlice } from "@reduxjs/toolkit";
import {
  createDokumentMPKalkulacije,
  createDokumentVPKalkulacije,
  createDokumentFakture,
  fetchDokumenti,
  fetchPdv,
  fetchDokumentiById,
  updateDokumentKalkulacije,
  deleteDokument,
  updateDokumentFakture,
  deleteDokumentFakture
} from "./dokumentThunks.js";

const dokumentSlice = createSlice({
  name: "dokument",
  initialState: {
    current: [],
    dokumenti: [],
    pdv: [],
    error: null,
    status: null,
  },
  reducers: {
    resetDokumenti(state) {
      state.dokumenti = []; // Resetuj dokumente
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDokumentMPKalkulacije.fulfilled, (state, action) => {
        state.dokumenti.push(action.payload);
        state.status = "succeeded";
      })
        .addCase(createDokumentVPKalkulacije.fulfilled, (state, action) => {
          state.dokumenti.push(action.payload);
          state.status = "succeeded";
        })
        .addCase(createDokumentFakture.fulfilled, (state, action) => {
          state.dokumenti.push(action.payload);
          state.status = "succeeded";
        })
      .addCase(fetchPdv.fulfilled, (state, action) => {
        state.loading = false;
        state.pdv = action.payload;
      })
      .addCase(fetchDokumenti.fulfilled, (state, action) => {
        state.dokumenti = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchDokumentiById.fulfilled, (state, action) => {
        state.current = action.payload;
        state.status = "succeeded";
      })
      .addCase(updateDokumentKalkulacije.fulfilled, (state, action) => {
        state.status = "succeeded";

        const index = state.dokumenti.findIndex(
          (dok) => dok.id === action.payload.id
        );
        if (index !== -1) {
          state.dokumenti[index] = action.payload;
        }
        if (state.current && state.current.id === action.payload.id) {
          state.current = action.payload;
        }
      })
        .addCase(updateDokumentFakture.fulfilled, (state, action) => {
          state.status = "succeeded";

          const index = state.dokumenti.findIndex(
              (dok) => dok.id === action.payload.id
          );
          if (index !== -1) {
            state.dokumenti[index] = action.payload;
          }
          if (state.current && state.current.id === action.payload.id) {
            state.current = action.payload;
          }
        })
        .addCase(deleteDokument.fulfilled, (state, action) => {
          state.dokumenti = state.dokumenti.filter(
              (dokument) => dokument.id !== action.meta.arg
          );
        })
        .addCase(deleteDokumentFakture.fulfilled, (state, action) => {
          state.dokumenti = state.dokumenti.filter(
              (dokument) => dokument.id !== action.meta.arg
          );
        })
        .addCase(deleteDokument.rejected, (state, action) => {
          state.error = action.payload;
        });
  },
});

export const { resetDokumenti } = dokumentSlice.actions;

export default dokumentSlice.reducer;
