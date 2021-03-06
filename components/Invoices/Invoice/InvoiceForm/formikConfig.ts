import * as yup from "yup";

export const defaultValues = {
  street: "",
  city: "",
  postCode: "",
  country: "",
  clientName: "",
  clientEmail: "",
  clientCity: "",
  clientStreetAddress: "",
  clientPostCode: "",
  clientCountry: "",
  date: new Date(),
  paymentTerms: 1,
  projectDescription: "",
};

export const validationSchema = yup.object().shape({
  street: yup.string().required("Street address is required"),
  city: yup.string().required("City is required"),
  postCode: yup.string().required("Post code is required"),
  country: yup.string().required("Country is required"),
  clientName: yup.string().required("Client name is required"),
  clientEmail: yup
    .string()
    .required("Client email is required")
    .email("Make sure you are passing valid email"),
  clientCity: yup.string().required("Client city code is required"),
  clientStreetAddress: yup
    .string()
    .required("Client street address  is required"),
  clientPostCode: yup.string().required("Client post code is required"),
  clientCountry: yup.string().required("Client country is required"),
  projectDescription: yup.string().required("Project description is required"),
  date: yup.date().required("Date is required!").nullable(),
  items: yup.array(),
});
