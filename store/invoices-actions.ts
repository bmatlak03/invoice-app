import { invoicesActions } from "./invoices-slice";
import { uiActions } from "./ui-slice";
import { AppDispatch } from ".";
export const sendInvoiceData = (invoiceData: any) => {
  return async (dispatch: AppDispatch) => {
    const {
      date,
      paymentTerms,
      streetAddress,
      city,
      postCode,
      country,
      clientName,
      clientEmail,
      clientStreetAddress,
      clientCity,
      clientPostCode,
      clientCountry,
      projectDescription,
      items,
      total,
    } = invoiceData;
    let paymentDueTransformed = new Date();
    paymentDueTransformed.setDate(date.getDate() + paymentTerms);
    let newInvoiceSchema: any = {
      paymentDue: paymentDueTransformed.toDateString(),
      description: projectDescription,
      clientName,
      clientEmail,
      paymentTerms,
      createdAt: date.toLocaleDateString(),
      senderAddress: {
        street: streetAddress,
        city,
        postCode,
        country,
      },
      clientAddress: {
        street: clientStreetAddress,
        city: clientCity,
        postCode: clientPostCode,
        country: clientCountry,
      },
      status: "pending",
      items,
      total,
    };
    const sendRequest = async () => {
      const response = await fetch("api/new-invoice", {
        method: "POST",
        body: JSON.stringify(newInvoiceSchema),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData: { id: string } = await response.json();
      newInvoiceSchema = { ...newInvoiceSchema, id: responseData.id };
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };
    try {
      await sendRequest();
      dispatch(invoicesActions.createNewInvoice(newInvoiceSchema));
      dispatch(uiActions.closeForm());
      //dispatch success notification
    } catch (error) {
      //dispach error notification
      console.log(error);
    }
  };
};
