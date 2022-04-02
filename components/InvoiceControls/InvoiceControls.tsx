import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import StyledButton from "../UI/StyledButton/StyledButton";
type Props = {
  onDelete: () => void;
  onStatusChange: () => void;
};

const InvoiceControls = (props: Props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { status } = useSelector(
    (state: RootState) => state.invoices.fetchedInvoice
  );
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
      <StyledButton type="red" onClick={props.onDelete}>
        Delete
      </StyledButton>
      <StyledButton
        disabled={status === "paid"}
        type="paid"
        onClick={props.onStatusChange}
      >
        Mark as paid
      </StyledButton>
    </Box>
  );
};
export default InvoiceControls;
