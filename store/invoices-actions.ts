import Router from "next/router";
import { AppDispatch } from ".";
import { invoicesActions } from "./invoices-slice";
import { uiActions } from "./ui-slice";
import { InvoiceType } from "./invoices-slice";
import { hideNotification } from "../helpers/helpers";
const headers = {
  "Content-Type": "application/json",
};
export const sendInvoiceData = (invoiceData: InvoiceType) => {
  let newInvoiceData = { ...invoiceData };
  return async (dispatch: AppDispatch) => {
    const sendRequest = async () => {
      const response = await fetch("api/new-invoice", {
        method: "POST",
        body: JSON.stringify(invoiceData),
        headers,
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
      dispatch(
        uiActions.showNotification({
          message: "Invoice has been successfully sent!",
          type: "success",
        })
      );
      dispatch(invoicesActions.disableDraftMode());
      hideNotification(dispatch);
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: "Something went wrong! Try again later.",
          type: "error",
        })
      );
      dispatch(uiActions.closeForm());
      dispatch(invoicesActions.disableDraftMode());
      hideNotification(dispatch);
    }
  };
};
export const deleteInvoice = (id: string) => {
  return async (dispatch: AppDispatch) => {
    const sendRequest = async () => {
      const response = await fetch("api/delete-invoice", {
        method: "DELETE",
        body: JSON.stringify(id),
        headers,
      });
      if (!response.ok) {
        throw new Error("Deleting invoice failed.");
      }
    };
    try {
      await sendRequest();
      dispatch(invoicesActions.deleteInvoice(id));
      dispatch(
        uiActions.showNotification({
          message: "Invoice has been successfully deleted!",
          type: "success",
        })
      );
      Router.push("/");
      dispatch(uiActions.closeDeleteConfirm());
      hideNotification(dispatch);
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: "Something went wrong! Try again later.",
          type: "error",
        })
      );
      dispatch(uiActions.closeDeleteConfirm());
      hideNotification(dispatch);
    }
  };
};
export const editInvoiceData = (invoiceData: InvoiceType) => {
  let newInvoiceData = { ...invoiceData };
  return async (dispatch: AppDispatch) => {
    const sendRequest = async () => {
      const response = await fetch("api/edit-invoice", {
        method: "PUT",
        body: JSON.stringify(invoiceData),
        headers,
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
      dispatch(
        uiActions.showNotification({
          message: "Invoice has been successfully edited!",
          type: "success",
        })
      );
      dispatch(invoicesActions.cancelEdit());
      dispatch(invoicesActions.insertFetchedInvoice(invoiceData));
      hideNotification(dispatch);
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: "Something went wrong! Try again later.",
          type: "error",
        })
      );
      dispatch(uiActions.closeForm());
      dispatch(invoicesActions.cancelEdit());
      hideNotification(dispatch);
    }
  };
};
export const markInvoiceAsPaid = (id: string) => {
  return async (dispatch: AppDispatch) => {
    const sendRequest = async () => {
      const response = await fetch("api/mark-as-paid-invoice", {
        method: "PUT",
        body: JSON.stringify(id),
        headers,
      });
      if (!response.ok) {
        throw new Error("Changing status failed.");
      }
    };
    try {
      await sendRequest();
      dispatch(invoicesActions.changeInvoiceStatus());
      dispatch(
        uiActions.showNotification({
          message: "Invoice has been successfully marked as paid!",
          type: "success",
        })
      );
      hideNotification(dispatch);
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: "Something went wrong! Try again later.",
          type: "error",
        })
      );
      hideNotification(dispatch);
    }
  };
};
