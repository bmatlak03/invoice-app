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
  currentInvoices: {
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
  currentInvoices: [],
};
const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    createNewInvoice(state, action) {
      state.invoices.push(action.payload);
      state.currentInvoices.push(action.payload);
    },
    insertFetchedInvoices(state, action) {
      state.invoices = action.payload;
      state.currentInvoices = action.payload;
    },
    deleteInvoice(state, action) {
      state.invoices = state.invoices.filter(
        (invoice) => invoice.id !== action.payload
      );
      state.currentInvoices = state.invoices.filter(
        (invoice) => invoice.id !== action.payload
      );
    },
    changeInvoiceStatus(state, action) {},
    filterInvoiceByStatus(state, action) {
      switch (action.payload) {
        case "any":
          state.currentInvoices = state.invoices;
          break;
        case "pending":
          state.currentInvoices = state.invoices.filter(
            (invoice) => invoice.status === action.payload
          );
          break;
        case "paid":
          state.currentInvoices = state.invoices.filter(
            (invoice) => invoice.status === action.payload
          );
        default:
          state.currentInvoices = state.invoices.filter(
            (invoice) => invoice.status === action.payload
          );
          break;
      }
    },
  },
});

export const invoicesActions = invoicesSlice.actions;

export default invoicesSlice;
