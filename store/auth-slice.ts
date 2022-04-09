import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    mode: "signin",
    authenticated: false,
  },
  reducers: {
    signupMode(state) {
      state.mode = "signup";
    },
    signinMode(state) {
      state.mode = "signin";
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
