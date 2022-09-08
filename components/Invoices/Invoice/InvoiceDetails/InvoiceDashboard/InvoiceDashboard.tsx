import { useDispatch } from "react-redux";
import { markInvoiceAsPaid } from "../../../../../store/invoices-actions";
import { uiActions } from "../../../../../store/ui-slice";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import InvoiceControls from "../../InvoiceControls/InvoiceControls";
import InvoiceStatus from "../../InvoiceStatus/InvoiceStatus";
import { InvoiceStatus as InvoiceStatusEnum } from "../../../../../constants";

type Props = {
  status: InvoiceStatusEnum;
  id: string;
};

const InvoiceDashboard = ({ status, id }: Props) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const boxStyles = {
    display: "flex",
    backgroundColor: theme.palette.primary.light,
    padding: 3,
    borderRadius: "10px",
  };
  return (
    <Box
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 2,
        ...boxStyles,
      }}
    >
      <Typography>Status</Typography>
      <InvoiceStatus status={status} />
      {!!matches && (
        <InvoiceControls
          onDelete={() => dispatch(uiActions.openDeleteConfirm())}
          onStatusChange={() => dispatch(markInvoiceAsPaid(id))}
        />
      )}
    </Box>
  );
};
export default InvoiceDashboard;
