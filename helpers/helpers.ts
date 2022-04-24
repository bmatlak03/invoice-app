import { nanoid } from "nanoid";
import {
  FormValues,
  InvoiceStatusType,
  InvoiceType,
  ItemsType,
} from "./../types/types";
import { AppDispatch } from "../store";
import { uiActions } from "../store/ui-slice";
export const hideNotification = (dispatch: AppDispatch) => {
  const notificationTime = 3000;
  setTimeout(() => {
    dispatch(uiActions.hideNotification());
  }, notificationTime);
};
export const transformInvoiceObject = (invoice: InvoiceType) => {
  const senderAddress = {
    streetAddress: invoice.senderAddress.street,
    city: invoice.senderAddress.city,
    postCode: invoice.senderAddress.postCode,
    country: invoice.senderAddress.country,
  };
  const clientAddress = {
    clientCity: invoice.clientAddress.city,
    clientStreetAddress: invoice.clientAddress.street,
    clientPostCode: invoice.clientAddress.postCode,
    clientCountry: invoice.clientAddress.country,
  };
  const transformedObject = {
    clientName: invoice.clientName,
    clientEmail: invoice.clientEmail,
    projectDescription: invoice.description,
    date: new Date(invoice.createdAt),
    paymentTerms: invoice.paymentTerms,
    ...senderAddress,
    ...clientAddress,
  };
  return transformedObject;
};
export const createInvoiceData = (
  values: FormValues,
  items: ItemsType[],
  status: InvoiceStatusType,
  id: string
) => {
  let totalPrice = 0;
  const itemsCopy = [...items];
  itemsCopy.forEach((item) => {
    item.total = item.quantity * item.price;
    totalPrice += item.total;
  });
  const paymentDueTransformed = new Date();
  paymentDueTransformed.setDate(values.date.getDate() + values.paymentTerms);
  const newInvoiceData: InvoiceType = {
    status: status,
    clientName: values.clientName,
    clientEmail: values.clientEmail,
    clientAddress: {
      street: values.clientStreetAddress,
      city: values.clientCity,
      postCode: values.clientPostCode,
      country: values.clientCountry,
    },
    description: values.projectDescription,
    senderAddress: {
      street: values.streetAddress,
      city: values.city,
      postCode: values.postCode,
      country: values.country,
    },
    paymentTerms: values.paymentTerms,
    createdAt: values.date.toDateString(),
    paymentDue: paymentDueTransformed.toDateString(),
    id: id,
    items: itemsCopy,
    total: totalPrice,
  };
  return newInvoiceData;
};
export const createId = () => {
  const id = nanoid(5);
  return id;
};
export const validateItems = (items: ItemsType[]) => {
  const isInvalid = items.some((item) => {
    item.total <= 0 || item.name === "";
  });
  return isInvalid;
};
export const checkInvoiceStatus = (
  status: InvoiceStatusType | undefined,
  draftMode: boolean
) => {
  if (draftMode) return "draft";
  else if (!status) return "pending";
  else return status;
};
