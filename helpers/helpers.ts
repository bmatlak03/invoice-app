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
  const { senderAddress } = invoice;
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
  const totalPrice = items.reduce(
    (partialSum, currentValue) => partialSum + currentValue.total,
    0
  );
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
      street: values.street,
      city: values.city,
      postCode: values.postCode,
      country: values.country,
    },
    paymentTerms: values.paymentTerms,
    createdAt: values.date.toDateString(),
    paymentDue: paymentDueTransformed.toDateString(),
    id: id,
    items: items,
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
