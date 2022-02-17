import React from "react";
import { Box, Typography } from "@mui/material";
import StyledButton from "../UI/StyledButton/StyledButton";
import FilterInoices from "../FilterInvoices/FilterInvoices";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
type Props = {};

const InvoicesAction = ({}: Props) => {
  const invoicesLength = useSelector(
    (state: RootState) => state.invoices.invoices.length
  );
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Invoices
        </Typography>
        <Typography variant="body2">
          {invoicesLength === 0 ? "No invoices" : `${invoicesLength} invoices`}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <FilterInoices />
        <StyledButton type="add" click={() => console.log("btn click")}>
          New
        </StyledButton>
      </Box>
    </Box>
  );
};
export default InvoicesAction;
