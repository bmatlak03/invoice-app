import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { invoicesActions } from "../../store/invoices-slice";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import FilterInoices from "../FilterInvoices/FilterInvoices";
import StyledButton from "../UI/StyledButton/StyledButton";
import { uiActions } from "../../store/ui-slice";
type Props = {};

const InvoicesAction = ({}: Props) => {
  const invoicesLength = useSelector(
    (state: RootState) => state.invoices.invoices.length
  );
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const buttonText = matches ? "New Invoice" : "New";
  const invoicesAmount =
    invoicesLength === 0 ? "No invoices" : `${invoicesLength} invoices`;
  const invoicesActionsContainerStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };
  return (
    <Box sx={invoicesActionsContainerStyles}>
      <Box>
        <Typography variant="h5" fontWeight={700}>
          Invoices
        </Typography>
        <Typography variant="body2">{invoicesAmount}</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <FilterInoices />
        <StyledButton type="add" onClick={() => dispatch(uiActions.openForm())}>
          {buttonText}
        </StyledButton>
      </Box>
    </Box>
  );
};
export default InvoicesAction;
