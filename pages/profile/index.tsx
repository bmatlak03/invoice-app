import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { signOut, getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import StyledButton from "../../components/UI/StyledButton/StyledButton";
import AvatarImg from "../../components/Avatar/Avatar";
const ProfilePage = ({}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const session = useSession();
  const userEmail = session?.data?.user?.email;
  const handleSignOut = () => signOut();
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
    width: matches ? "50%" : "90",
    height: "60%",
    padding: "2%",
    backgroundColor: theme.palette.primary.light,
  };
  return (
    <Box sx={centeredBox}>
      <Box sx={boxStyles}>
        <Typography variant="h5">You are logged in as:</Typography>
        <Typography variant="body1">{userEmail}</Typography>
        <AvatarImg />
        <StyledButton type="red" onClick={handleSignOut}>
          Sign out
        </StyledButton>
      </Box>
    </Box>
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
