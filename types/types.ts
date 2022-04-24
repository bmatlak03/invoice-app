export interface ItemsType {
  name: string;
  quantity: number;
  price: number;
  total: number;
  id: number;
}
export type InvoiceStatusType = "paid" | "pending" | "draft";
export interface InvoiceType {
  id: string;
  status: InvoiceStatusType;
  clientName: string;
  clientEmail: string;
  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  description: string;
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  createdAt: string;
  paymentDue: string;
  paymentTerms: number;
  items: ItemsType[];

  total: number;
}
export interface FormValues {
  streetAddress: string;
  city: string;
  postCode: string;
  country: string;
  clientName: string;
  clientEmail: string;
  clientCity: string;
  clientStreetAddress: string;
  clientPostCode: string;
  clientCountry: string;
  date: Date;
  paymentTerms: number;
  projectDescription: string;
}
