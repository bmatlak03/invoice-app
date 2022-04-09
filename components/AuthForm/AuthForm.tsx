import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { authActions } from "../../store/auth-slice";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import { defaultValues, validationSchema } from "./formikConfig";
import { Typography, useTheme } from "@mui/material";
import Input from "../../components/UI/Input/Input";
import StyledButton from "../../components/UI/StyledButton/StyledButton";
import { useRouter } from "next/router";

const AuthForm = ({}) => {
  const theme = useTheme();
  const router = useRouter();
  const { mode } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: validationSchema,
    onSubmit: async ({ email, password }) => {
      if (mode === "signin") {
        const status = await signIn("credentials", {
          redirect: false,
          email: email,
          password: password,
        });
        router.replace("/");
        console.log(status);
      } else {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        console.log(response);
      }
    },
  });
  const formStyles: {} = {
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    alignItems: "center",
    justifyContent: "space-between",
    width: "50%",
    height: "60%",
    padding: "2%",
    backgroundColor: theme.palette.primary.light,
  };
  const switchMode = () => {
    if (mode === "signin") {
      dispatch(authActions.signupMode());
    } else {
      dispatch(authActions.signinMode());
    }
  };
  return (
    <form onSubmit={formik.handleSubmit} style={formStyles}>
      <Typography variant="h3" textAlign="center" mb={3}>
        {mode === "signin" ? "Sign in" : "Sign up"}
      </Typography>
      <Input
        name="email"
        label="Email"
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        value={formik.values.email}
        change={formik.handleChange}
      />
      <Input
        name="password"
        label="Password"
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        value={formik.values.password}
        change={formik.handleChange}
      />
      <Typography variant="body1">
        {mode === "signin"
          ? "Don't have an account?"
          : "Already have an account?"}
      </Typography>
      <StyledButton type="grey" onClick={switchMode}>
        {mode === "signin" ? "Create an account" : "Log in"}
      </StyledButton>
      <StyledButton role="submit">
        {mode === "signin" ? "Sign in" : "Sign up"}
      </StyledButton>
    </form>
  );
};
export default AuthForm;
