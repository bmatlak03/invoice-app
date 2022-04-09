import { Box } from "@mui/material";
import { signOut, getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
const ProfilePage = ({}) => {
  const handleSignOut = () => signOut();
  return (
    <Box>
      <button onClick={handleSignOut}>Sign out</button>
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
