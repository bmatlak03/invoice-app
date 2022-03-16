import { createSlice } from "@reduxjs/toolkit";
export type SliceState = {
  invoices: {
    id: string;
    streetAddress: string;
    city: string;
    postCode: string;
    clientName: string;
    paymentDue: string;
    status: string;
    clientEmail: string;
    clientCity: string;
    clientStreetAddres: string;
    clientPostCode: string;
    date: string;
    paymentTerms: number;
    projectDescription: string;
    items: [];
    total: number;
  }[];
};
const initialState: SliceState = {
  invoices: [],
};
const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    createNewInvoice(state, action) {
      state.invoices.push(action.payload);
    },
    insertFetchedInvoices(state, action) {
      state.invoices = action.payload;
    },
  },
});

export const invoicesActions = invoicesSlice.actions;

export default invoicesSlice;
