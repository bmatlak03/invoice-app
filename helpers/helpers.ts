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
