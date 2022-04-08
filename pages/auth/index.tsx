import { Box } from "@mui/material";
import AuthForm from "../../components/AuthForm/AuthForm";
type Props = {};

const AuthPage = (props: Props) => {
  const centeredBox = {
    display: "flex",
    height: "calc(100vh - 60px)",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <Box sx={centeredBox}>
      <AuthForm />
    </Box>
  );
};
export default AuthPage;
