import { Box, useMediaQuery, useTheme } from "@mui/material";
import StyledButton from "../UI/StyledButton/StyledButton";
type Props = {};

const InvoiceControls = (props: Props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: matches ? "45%" : "100%",
        height: "80px",
        padding: 2,
        backgroundColor: theme.palette.primary.light,
      }}
    >
      <StyledButton type="grey">Edit</StyledButton>
      <StyledButton type="red">Delete</StyledButton>
      <StyledButton type="paid">Mark as paid</StyledButton>
    </Box>
  );
};
export default InvoiceControls;
