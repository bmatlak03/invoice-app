import { Box, Typography } from "@mui/material";
import Image from "next/image";
import EmptyInvoicesIMG from "../../..//assets/illustration-empty.svg";

const NoInvoices = () => {
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
          New
        </Typography>{" "}
        button and get started
      </Typography>
    </Box>
  );
};
export default NoInvoices;
