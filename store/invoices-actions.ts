import { invoicesActions } from "./invoices-slice";
import { uiActions } from "./ui-slice";
import { AppDispatch } from ".";
import { InvoiceType } from "./invoices-slice";
import Router from "next/router";
export const sendInvoiceData = (invoiceData: InvoiceType) => {
  let newInvoiceData = { ...invoiceData };
  return async (dispatch: AppDispatch) => {
    const sendRequest = async () => {
      const response = await fetch("api/new-invoice", {
        method: "POST",
        body: JSON.stringify(invoiceData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData: { id: string } = await response.json();
      newInvoiceData = { ...newInvoiceData, id: responseData.id };
      if (!response.ok) {
        throw new Error("Sending invoice data failed.");
      }
    };
    try {
      await sendRequest();
      dispatch(invoicesActions.createNewInvoice(newInvoiceData));
      dispatch(uiActions.closeForm());
      //dispatch success notification
    } catch (error) {
      //dispach error notification
      console.log(error);
    }
  };
};
export const deleteInvoice = (id: string) => {
  return async (dispatch: AppDispatch) => {
    const sendRequest = async () => {
      const response = await fetch("api/delete-invoice", {
        method: "DELETE",
        body: JSON.stringify(id),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Deleting invoice failed.");
      }
    };
    try {
      await sendRequest();
      dispatch(invoicesActions.deleteInvoice(id));
      Router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
};
export const markInvoiceAsPaid = (id: string) => {
  return async (dispatch: AppDispatch) => {
    const sendRequest = async () => {
      const response = await fetch("api/mark-as-paid-invoice", {
        method: "PUT",
        body: JSON.stringify(id),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Changing status failed.");
      }
    };
    try {
      await sendRequest();
      dispatch(invoicesActions.changeInvoiceStatus());
    } catch (error) {
      console.log(error);
    }
  };
};
