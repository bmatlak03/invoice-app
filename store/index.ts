import { configureStore } from "@reduxjs/toolkit";
import invoicesSlice from "./invoices-slice";

const store = configureStore({
  reducer: { invoices: invoicesSlice.reducer },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
