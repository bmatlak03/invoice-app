import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isFormOpen: false,
    isFilterOpen: false,
    notification: {
      isShow: false,
      type: "",
      message: "",
    },
    isDeleteConfirmOpen: false,
    avatar: "",
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
    showNotification(state, action) {
      state.notification = {
        isShow: true,
        type: action.payload.type,
        message: action.payload.message,
      };
    },
    hideNotification(state) {
      state.notification.isShow = false;
    },
    setAvatar(state, action) {
      state.avatar = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
