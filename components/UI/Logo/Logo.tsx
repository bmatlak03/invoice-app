import { useRouter } from "next/router";
import { Box, useTheme } from "@mui/material";
import LogoIMG from "../../../assets/logo.svg";
import Image from "next/image";
const Logo: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const boxLogoStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "60px",
    height: "100%",
    borderTopRightRadius: "15px",
    borderBottomRightRadius: "15px",
    backgroundColor: theme.palette.secondary.main,
    cursor: "pointer",
  };
  return (
    <Box sx={boxLogoStyles} onClick={() => router.push("/")}>
      <Image src={LogoIMG} alt="logo" />
    </Box>
  );
};
export default Logo;
