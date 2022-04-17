import Head from "next/head";
import { GetServerSideProps } from "next";
import { signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import StyledButton from "../../components/UI/StyledButton/StyledButton";
import AvatarImg from "../../components/Avatar/Avatar";
import GoBackBtn from "../../components/UI/GoBackBtn/GoBackBtn";

const ProfilePage = ({ session }: any) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const router = useRouter();
  const userEmail = session.user.email;
  const handleSignOut = () => signOut();
  const handleChangeAvatar = () => {
    console.log("changing avatar");
  };
  const centeredBox = {
    display: "flex",
    height: "calc(100vh - 60px)",
    justifyContent: "center",
    alignItems: "center",
  };
  const boxStyles: {} = {
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    alignItems: "center",
    justifyContent: "space-around",
    width: matches ? "50%" : "90%",
    height: "60%",
    padding: "2%",
    backgroundColor: theme.palette.primary.light,
  };

  return (
    <>
      <Head>
        <title>Profile: {userEmail}</title>
      </Head>
      <Box sx={centeredBox}>
        <Box sx={boxStyles}>
          <GoBackBtn click={() => router.back()} />
          <Typography variant="h5">You are logged in as:</Typography>
          <AvatarImg click={handleChangeAvatar} size="big" />
          <Typography variant="body1">{userEmail}</Typography>
          <StyledButton type="red" onClick={handleSignOut}>
            Sign out
          </StyledButton>
        </Box>
      </Box>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
export default ProfilePage;
