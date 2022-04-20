import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/index";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import StyledButton from "../../../UI/StyledButton/StyledButton";
import { invoicesActions } from "../../../../store/invoices-slice";
import { uiActions } from "../../../../store/ui-slice";
type Props = {
  onDelete: () => void;
  onStatusChange: () => void;
};

const InvoiceControls = (props: Props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { status } = useSelector(
    (state: RootState) => state.invoices.fetchedInvoice
  );
  const editInvoiceHandler = useCallback(() => {
    dispatch(invoicesActions.editInvoice());
    dispatch(uiActions.openForm());
  }, [dispatch]);
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
      <StyledButton type="grey" onClick={editInvoiceHandler}>
        Edit
      </StyledButton>
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
