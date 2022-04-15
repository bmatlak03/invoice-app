import { useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import AuthForm from "../../components/AuthForm/AuthForm";
import Head from "next/head";

const AuthPage = ({}) => {
  const router = useRouter();
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

  return (
    <>
      <Head>
        <title>Autenticate</title>
      </Head>
      <Box sx={wrapperStyles}>
        <Box sx={centeredBox}>
          <AuthForm />
        </Box>
      </Box>
    </>
  );
};
export default AuthPage;
