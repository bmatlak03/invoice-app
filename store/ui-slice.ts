import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isFormOpen: false,
    isFilterOpen: false,
    notification: null,
    isDeleteConfirmOpen: false,
  },
  reducers: {
    openForm(state) {
      state.isFormOpen = true;
      state.isFilterOpen = false;
    },
    closeForm(state) {
      state.isFormOpen = false;
    },
    toggleFilter(state) {
      state.isFilterOpen = !state.isFilterOpen;
    },
    openDeleteConfirm(state) {
      state.isDeleteConfirmOpen = true;
    },
    closeDeleteConfirm(state) {
      state.isDeleteConfirmOpen = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
