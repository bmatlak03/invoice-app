import { createSlice } from "@reduxjs/toolkit";

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: {
    invoices: [
      {
        id: "RT3080",
        createdAt: "2021-08-18",
        paymentDue: "2021-08-19",
        description: "Re-branding",
        paymentTerms: 1,
        clientName: "Jensen Huang",
        clientEmail: "jensenh@mail.com",
        status: "paid",
        senderAddress: {
          street: "19 Union Terrace",
          city: "London",
          postCode: "E1 3EZ",
          country: "United Kingdom",
        },
        clientAddress: {
          street: "106 Kendell Street",
          city: "Sharrington",
          postCode: "NR24 5WQ",
          country: "United Kingdom",
        },
        items: [
          {
            name: "Brand Guidelines",
            quantity: 1,
            price: 1800.9,
            total: 1800.9,
          },
        ],
        total: 1800.9,
      },
      {
        id: "XM9141",
        createdAt: "2021-08-21",
        paymentDue: "2021-09-20",
        description: "Graphic Design",
        paymentTerms: 30,
        clientName: "Alex Grim",
        clientEmail: "alexgrim@mail.com",
        status: "pending",
        senderAddress: {
          street: "19 Union Terrace",
          city: "London",
          postCode: "E1 3EZ",
          country: "United Kingdom",
        },
        clientAddress: {
          street: "84 Church Way",
          city: "Bradford",
          postCode: "BD1 9PB",
          country: "United Kingdom",
        },
        items: [
          {
            name: "Banner Design",
            quantity: 1,
            price: 156.0,
            total: 156.0,
          },
          {
            name: "Email Design",
            quantity: 2,
            price: 200.0,
            total: 400.0,
          },
        ],
        total: 556.0,
      },
      {
        id: "RG0314",
        createdAt: "2021-09-24",
        paymentDue: "2021-10-01",
        description: "Website Redesign",
        paymentTerms: 7,
        clientName: "John Morrison",
        clientEmail: "jm@myco.com",
        status: "paid",
        senderAddress: {
          street: "19 Union Terrace",
          city: "London",
          postCode: "E1 3EZ",
          country: "United Kingdom",
        },
        clientAddress: {
          street: "79 Dover Road",
          city: "Westhall",
          postCode: "IP19 3PF",
          country: "United Kingdom",
        },
        items: [
          {
            name: "Website Redesign",
            quantity: 1,
            price: 14002.33,
            total: 14002.33,
          },
        ],
        total: 14002.33,
      },
    ],
    isFormOpen: false,
  },
  reducers: {
    openForm(state) {
      state.isFormOpen = true;
    },
    closeForm(state) {
      state.isFormOpen = false;
    },
    createNewInvoice(state, action) {
      const { date, paymentTerms } = action.payload;
      let paymentDueTransformed = new Date();
      paymentDueTransformed.setDate(date.getDate() + paymentTerms);
      const newInvoiceSchema: any = {
        id: date.getMilliseconds(), // must be replaced
        ...action.payload,
        createdAt: date,
        paymentDue: paymentDueTransformed.toDateString(),
        status: "pending",
      };
      state.invoices.push(newInvoiceSchema);
      state.isFormOpen = false;
    },
  },
});

export const invoicesActions = invoicesSlice.actions;

export default invoicesSlice;
