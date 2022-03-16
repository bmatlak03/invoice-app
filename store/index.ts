import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import invoicesSlice from "./invoices-slice";
import uiSlice from "./ui-slice";
const store = configureStore({
  reducer: { invoices: invoicesSlice.reducer, ui: uiSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
