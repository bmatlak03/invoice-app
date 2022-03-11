import * as yup from "yup";

export const defaultValues = {
  streetAddress: "",
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
  streetAddress: yup.string().required("Email is required"),
  city: yup.string().required("City is required"),
  postCode: yup.string().required("Post code is required"),
  country: yup.string().required("Country is required"),
  clientName: yup.string().required("Client name is required"),
  clientEmail: yup.string().required("Client email is required"),
  clientCity: yup.string().required("Client city code is required"),
  clientStreetAddress: yup
    .string()
    .required("Client street address  is required"),
  clientPostCode: yup.string().required("Client post code is required"),
  clientCountry: yup.string().required("Client country is required"),
  projectDescription: yup.string().required("Project description is required"),
  date: yup.date().nullable(),
  items: yup.array(),
});
