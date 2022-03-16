import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isFormOpen: false,
    notification: null,
  },
  reducers: {
    openForm(state) {
      state.isFormOpen = true;
    },
    closeForm(state) {
      state.isFormOpen = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
