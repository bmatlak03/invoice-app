import { createSlice } from "@reduxjs/toolkit";
export interface InvoiceType {
  id: string;
  status: "paid" | "pending" | "draft";
  clientName: string;
  clientEmail: string;
  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  description: string;
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  createdAt: string;
  paymentDue: string;
  paymentTerms: number;
  items: {
    name: string;
    quantity: number;
    price: number;
    total: number;
  }[];

  total: number;
}

export interface SliceState {
  invoices: InvoiceType[];
  currentInvoices: InvoiceType[];
  fetchedInvoice: InvoiceType;
  isDraftMode: boolean;
  isEditMode: boolean;
}
const initialState: SliceState = {
  invoices: [],
  currentInvoices: [],
  fetchedInvoice: {
    id: "",
    status: "pending",
    clientName: "",
    clientEmail: "",
    clientAddress: { street: "", city: "", postCode: "", country: "" },
    description: "",
    senderAddress: { street: "", city: "", postCode: "", country: "" },
    createdAt: "",
    paymentDue: "",
    paymentTerms: 1,
    items: [{ name: "", quantity: 0, price: 0, total: 0 }],
    total: 0,
  },
  isDraftMode: false,
  isEditMode: false,
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
    insertFetchedInvoice(state, action) {
      state.fetchedInvoice = action.payload;
    },
    deleteInvoice(state, action) {
      state.invoices = state.invoices.filter(
        (invoice) => invoice.id !== action.payload
      );
      state.currentInvoices = state.invoices.filter(
        (invoice) => invoice.id !== action.payload
      );
    },
    saveAsDraft(state) {
      state.isDraftMode = true;
    },
    disableDraftMode(state) {
      state.isDraftMode = false;
    },
    editInvoice(state) {
      state.isEditMode = true;
    },
    cancelEdit(state) {
      state.isEditMode = false;
    },
    changeInvoiceStatus(state) {
      state.fetchedInvoice.status = "paid";
    },
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
