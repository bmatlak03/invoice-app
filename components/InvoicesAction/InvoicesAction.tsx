import React from "react";
import { Box, Typography } from "@mui/material";
import StyledButton from "../UI/StyledButton/StyledButton";
type Props = {};

const InvoicesAction = ({}: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Box>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Invoices
        </Typography>
        <Typography variant="body2">Invoices amount</Typography>
      </Box>
      <Box>
        <StyledButton type="add" click={() => console.log("btn click")}>
          New
        </StyledButton>
      </Box>
    </Box>
  );
};
export default InvoicesAction;
