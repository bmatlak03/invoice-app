import Head from "next/head";
import { GetServerSideProps } from "next";
import { useRef, useState } from "react";
import { signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import StyledButton from "../../components/UI/StyledButton/StyledButton";
import AvatarImg from "../../components/Avatar/Avatar";
import GoBackBtn from "../../components/UI/GoBackBtn/GoBackBtn";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import { useDispatch } from "react-redux";
import { sendAvatar } from "../../store/ui-actions";

const ProfilePage = ({ session }: any) => {
  const [image, setImage] = useState<any>();
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const router = useRouter();
  const dispatch = useDispatch();
  const userEmail = session.user.email;
  const handleSignOut = () => signOut();
  const handleChangeAvatar = () => {
    const input = inputRef.current;
    if (input) {
      input.value = "";
      input.click();
    }
  };
  const onFileAttach = (file: Blob) => {
    setImage(file);
  };
  const handleSubmitImage = async (croppedImage: Blob) => {
    const fr: any = new FileReader();
    fr.onload = () => {
      const base64data = fr.result;
      console.log("dispatching");
      dispatch(sendAvatar(base64data));
      setImage(null);
    };
    fr.readAsDataURL(croppedImage);
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
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        accept="image/jpeg,image/png"
        onChange={(e) => {
          const file = e.target?.files?.[0];
          if (file) {
            onFileAttach(file);
          }
        }}
      />
      <Head>
        <title>Profile: {userEmail}</title>
      </Head>
      <Box sx={centeredBox}>
        {!!image && (
          <ImageUpload
            crop
            file={image}
            header="Set Your Avatar"
            onSubmit={handleSubmitImage}
            close={() => setImage(null)}
          />
        )}
        <Box sx={boxStyles}>
          <GoBackBtn click={() => router.back()} />
          <Typography variant="h5">You are logged in as:</Typography>
          <AvatarImg click={handleChangeAvatar} size="big" img={image} />
          <Typography variant="body2" color="text.secondary">
            ☝️ Change avatar by clicking icon above ☝️
          </Typography>
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
