import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { Box } from "@mui/material";
import AuthForm from "../../components/AuthForm/AuthForm";
import Notification from "../../components/UI/Notification/Notification";

const AuthPage = ({}) => {
  const router = useRouter();
  const { notification } = useSelector((state: RootState) => state.ui);
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      }
    });
  }, [router]);
  const wrapperStyles = {
    height: "calc(100vh - 60px)",
    padding: 2,
  };
  const centeredBox = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };
  const displayedNotification = notification.isShow && (
    <Notification type={notification.type} message={notification.message} />
  );

  return (
    <Box sx={wrapperStyles}>
      {displayedNotification}
      <Box sx={centeredBox}>
        <AuthForm />
      </Box>
    </Box>
  );
};
export default AuthPage;
