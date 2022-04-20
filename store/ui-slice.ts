import { AlertColor } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

interface UiSlice {
  isFormOpen: boolean;
  isFilterOpen: boolean;
  notification: {
    isShow: boolean;
    type: AlertColor;
    message: string;
  };
  isDeleteConfirmOpen: boolean;
  avatar: string;
}

const initialState: UiSlice = {
  isFormOpen: false,
  isFilterOpen: false,
  notification: {
    isShow: false,
    type: "success",
    message: "",
  },
  isDeleteConfirmOpen: false,
  avatar: "",
};
const uiSlice = createSlice({
  name: "ui",
  initialState,
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
