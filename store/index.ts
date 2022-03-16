import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import invoicesSlice from "./invoices-slice";
const store = configureStore({
  reducer: { invoices: invoicesSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
