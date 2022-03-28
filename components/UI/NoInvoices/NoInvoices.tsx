import Image from "next/image";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import EmptyInvoicesIMG from "../../..//assets/illustration-empty.svg";

const NoInvoices = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const centeredBoxStyles = {
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  };
  return (
    <Box sx={centeredBoxStyles}>
      <Image src={EmptyInvoicesIMG} alt="no invoices yet" />
      <Typography fontWeight="bold" variant="h4">
        There is nothing here
      </Typography>
      <Typography color="text.secondary">
        Create an invoice by clicking the{" "}
        <Typography fontWeight="bold" component="span">
          New {matches && "Invoice"}
        </Typography>{" "}
        button and get started
      </Typography>
    </Box>
  );
};
export default NoInvoices;
