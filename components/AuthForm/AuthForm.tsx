import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { authActions } from "../../store/auth-slice";
import { useFormik } from "formik";
import { defaultValues, validationSchema } from "./formikConfig";
import { Typography, useTheme } from "@mui/material";
import Input from "../../components/UI/Input/Input";
import StyledButton from "../../components/UI/StyledButton/StyledButton";

const AuthForm = ({}) => {
  const theme = useTheme();
  const { mode } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert("Credentials: " + JSON.stringify(values));
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
    if (mode === "singin") {
      dispatch(authActions.singupMode());
    } else {
      dispatch(authActions.singinMode());
    }
  };
  return (
    <form onSubmit={formik.handleSubmit} style={formStyles}>
      <Typography variant="h3" textAlign="center" mb={3}>
        {mode === "singin" ? "Sing in" : "Sing up"}
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
        {mode === "singin"
          ? "Don't have an account?"
          : "Already have an account?"}
      </Typography>
      <StyledButton type="grey" onClick={switchMode}>
        {mode === "singin" ? "Create an account" : "Log in"}
      </StyledButton>
      <StyledButton role="submit">
        {mode === "singin" ? "Sing in" : "Sing up"}
      </StyledButton>
    </form>
  );
};
export default AuthForm;
