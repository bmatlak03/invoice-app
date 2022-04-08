import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    mode: "singin",
    authenticated: false,
  },
  reducers: {
    singupMode(state) {
      state.mode = "singup";
    },
    singinMode(state) {
      state.mode = "singin";
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
