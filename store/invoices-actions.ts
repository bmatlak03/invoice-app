import Router from "next/router";
import { AppDispatch } from ".";
import { invoicesActions } from "./invoices-slice";
import { uiActions } from "./ui-slice";
import { InvoiceType } from "./invoices-slice";
import { hideNotification } from "../helpers/hideNotification";

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
          message: error,
          type: "error",
        })
      );
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
          message: error,
          type: "error",
        })
      );
      dispatch(uiActions.closeDeleteConfirm());
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
          message: error,
          type: "error",
        })
      );
      hideNotification(dispatch);
    }
  };
};
