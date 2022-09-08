import { createSlice } from "@reduxjs/toolkit";
import { AuthMethod } from "../constants";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    mode: AuthMethod.SIGNIN,
    authenticated: false,
  },
  reducers: {
    signupMode(state) {
      state.mode = AuthMethod.SIGNUP;
    },
    signinMode(state) {
      state.mode = AuthMethod.SIGNIN;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
