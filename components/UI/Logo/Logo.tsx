import { Box, useTheme } from "@mui/material";
import LogoIMG from "../../../assets/logo.svg";
import Image from "next/image";
const Logo: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "60px",
        height: "100%",
        borderTopRightRadius: "15px",
        borderBottomRightRadius: "15px",
        backgroundColor: theme.palette.main,
      }}
    >
      <Image src={LogoIMG} alt="logo" />
    </Box>
  );
};
export default Logo;
