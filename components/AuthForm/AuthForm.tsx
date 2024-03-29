import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { authActions } from "../../store/auth-slice";
import { signInUser, signUpUser } from "../../store/auth-actions";
import { useFormik } from "formik";
import { defaultValues, validationSchema } from "./formikConfig";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import Input from "../../components/UI/Input/Input";
import StyledButton from "../../components/UI/StyledButton/StyledButton";
import { AuthMethod } from "../../constants";

const AuthForm = ({}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { mode } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: validationSchema,
    onSubmit: async ({ email, password }) => {
      if (mode === AuthMethod.SIGNIN) {
        dispatch(signInUser(email, password));
      } else {
        dispatch(signUpUser(email, password));
      }
    },
  });
  const formStyles: {} = {
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    alignItems: "center",
    justifyContent: "space-between",
    width: matches ? "50%" : "90%",
    height: "60%",
    padding: "2%",
    backgroundColor: theme.palette.primary.light,
  };
  const switchMode = () => {
    if (mode === AuthMethod.SIGNIN) {
      dispatch(authActions.signupMode());
    } else {
      dispatch(authActions.signinMode());
    }
  };
  return (
    <form onSubmit={formik.handleSubmit} style={formStyles}>
      <Typography variant="h3" textAlign="center" mb={3}>
        {mode === AuthMethod.SIGNIN ? "Sign in" : "Sign up"}
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
        type="password"
        change={formik.handleChange}
      />
      <Typography variant="body1">
        {mode === AuthMethod.SIGNIN
          ? "Don't have an account?"
          : "Already have an account?"}
      </Typography>
      <StyledButton type="grey" onClick={switchMode}>
        {mode === AuthMethod.SIGNIN ? "Create an account" : "Switch to sign in"}
      </StyledButton>
      <StyledButton role="submit">
        {mode === AuthMethod.SIGNIN ? "Sign in" : "Sign up"}
      </StyledButton>
    </form>
  );
};
export default AuthForm;
