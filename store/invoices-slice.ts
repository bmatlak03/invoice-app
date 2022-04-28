import { createSlice } from "@reduxjs/toolkit";
import { InvoiceType } from "../types/types";

interface SliceState {
  currentInvoices: InvoiceType[];
  fetchedInvoice: InvoiceType;
  isDraftMode: boolean;
  isEditMode: boolean;
  filter: string;
}
const initialState: SliceState = {
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
    items: [{ name: "", quantity: 0, price: 0, total: 0, id: 0 }],
    total: 0,
  },
  isDraftMode: false,
  isEditMode: false,
  filter: "",
};
const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    createNewInvoice(state, action) {
      state.currentInvoices.push(action.payload);
    },
    insertFetchedInvoices(state, action) {
      state.currentInvoices = action.payload;
    },
    insertFetchedInvoice(state, action) {
      state.fetchedInvoice = action.payload;
    },
    deleteInvoice(state, action) {
      state.currentInvoices = state.currentInvoices.filter(
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
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const invoicesActions = invoicesSlice.actions;

export default invoicesSlice;
