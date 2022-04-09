import { Item } from "./../components/InvoiceForm/InvoiceForm";
import { InvoiceType } from "./../store/invoices-slice";
import { AppDispatch } from "../store";
import { uiActions } from "../store/ui-slice";
const notificationTime = 4000;
export const hideNotification = (dispatch: AppDispatch) => {
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
export const transformInvoiceItems = (items: []) => {
  let transformedItems: Array<Item> = [];
  console.log(items.length);
  items.forEach((item: Item) => {
    let itemObject = {
      name: "",
      price: 0,
      quantity: 0,
      id: 0,
      total: 0,
    };
    Object.defineProperties(itemObject, {
      name: {
        value: item.name,
        writable: true,
      },
      price: {
        value: item.price,
        writable: true,
      },
      quantity: {
        value: item.quantity,
        writable: true,
      },
      id: {
        value: item.id,
        writable: true,
      },
      total: {
        value: item.total,
        writable: true,
      },
    });
    transformedItems.push(itemObject);
  });
  return transformedItems;
};
export const createInvoiceData = (
  values: any,
  items: Item[],
  status: "paid" | "draft" | "pending",
  id: string
) => {
  console.log(id);
  let totalPrice = 0;
  const itemsCopy = [...items];
  itemsCopy.forEach((item) => {
    item.total = item.quantity * item.price;
    totalPrice += item.total;
  });
  let paymentDueTransformed = new Date();
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
    createdAt: values.date.toLocaleDateString(),
    paymentDue: paymentDueTransformed.toLocaleDateString(),
    id: id,
    items: itemsCopy,
    total: totalPrice,
  };
  return newInvoiceData;
};
export const truncateObjectId = (id: string, n: number) => {
  return id.length > n ? id.slice(0, n - 1) + "..." : id;
};
export const mongoObjectId = function () {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
};
