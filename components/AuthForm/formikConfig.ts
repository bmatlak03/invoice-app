import * as yup from "yup";

export const defaultValues = {
  email: "",
  password: "",
};

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Make sure you are passing valid email"),
  password: yup.string().required("Password is required").min(5).max(12),
});
