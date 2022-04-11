import { useRouter } from "next/router";
import { lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { invoicesActions } from "../../store/invoices-slice";
import { uiActions } from "../../store/ui-slice";
import { RootState } from "../../store";
import { markInvoiceAsPaid } from "../../store/invoices-actions";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Backdrop,
} from "@mui/material";
import InvoiceStatus from "../../components/InvoiceStatus/InvoiceStatus";
import ItemsList from "../../components/ItemsList/ItemsList";
import InvoiceControls from "../../components/InvoiceControls/InvoiceControls";
import ConfirmAlert from "../../components/UI/ConfirmAlert/ConfirmAlert";
import GoBackBtn from "../../components/UI/GoBackBtn/GoBackBtn";
import Notification from "../../components/UI/Notification/Notification";
import Spinner from "../UI/Spinner/Spinner";
const InvoiceForm = lazy(() => import("../InvoiceForm/InvoiceForm"));

const InvoiceDetails = ({}) => {
  const dispatch = useDispatch();
  const { isDeleteConfirmOpen: open, notification } = useSelector(
    (state: RootState) => state.ui
  );
  const theme = useTheme();
  const router = useRouter();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const { fetchedInvoice, isEditMode } = useSelector(
    (state: any) => state.invoices
  );
  const {
    id,
    status,
    clientName,
    clientEmail,
    clientAddress,
    description,
    senderAddress,
    createdAt,
    paymentDue,
    items,
    total,
  } = fetchedInvoice;
  const { isFormOpen } = useSelector((state: RootState) => state.ui);
  const boxStyles = {
    display: "flex",
    backgroundColor: theme.palette.primary.light,
    padding: 3,
    borderRadius: "10px",
  };

  const invoiceOptions = (
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
  const invoiceId = (
    <Typography color="text.secondary">
      #
      <Typography component="span" color="text.primary" fontWeight={600}>
        {id}
      </Typography>
    </Typography>
  );
  const streetAddressInfo = (
    <Box marginTop={!matches ? 2 : 0}>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        {senderAddress?.street}
      </Typography>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        {senderAddress?.city}
      </Typography>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        {senderAddress?.postCode}
      </Typography>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        {senderAddress?.city}
      </Typography>
    </Box>
  );
  const dateInfos = (
    <Box>
      <Box marginTop={2}>
        <Typography variant="subtitle2" color="text.secondary">
          Invoice Date
        </Typography>
        <Typography component="span" color="text.primary" fontWeight={600}>
          {createdAt}
        </Typography>
      </Box>
      <Box marginTop={2}>
        <Typography variant="subtitle2" color="text.secondary">
          PaymentDue
        </Typography>
        <Typography component="span" color="text.primary" fontWeight={600}>
          {paymentDue}
        </Typography>
      </Box>
    </Box>
  );
  const clientEmailBox = (
    <Box mt={2}>
      <Typography variant="subtitle2" color="text.secondary">
        Sent To
      </Typography>
      <Typography component="span" color="text.primary" fontWeight={600}>
        {clientEmail}
      </Typography>
    </Box>
  );
  const clientDetails = (
    <Box marginTop={2}>
      <Typography variant="subtitle2" color="text.secondary">
        Bill To
      </Typography>
      <Typography component="span" color="text.primary" fontWeight={600}>
        {clientName}
      </Typography>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        {clientAddress?.street}
      </Typography>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        {clientAddress?.city}
      </Typography>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        {clientAddress?.postCode}
      </Typography>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        {clientAddress?.country}
      </Typography>
    </Box>
  );
  const details = (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {dateInfos}
      {clientDetails}
      {clientEmailBox}
    </Box>
  );
  const invoiceOverview = (
    <Box
      sx={{
        marginTop: 2,
        ...boxStyles,
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          flexDirection: !matches ? "column" : "row",
        }}
      >
        <Box>
          {invoiceId}
          <Typography variant="subtitle2" color="text.secondary">
            {description}
          </Typography>
        </Box>
        {streetAddressInfo}
      </Box>
      {details}
      <ItemsList items={items} totalPrice={total} />
    </Box>
  );
  const displayedNotification = notification.isShow && (
    <Notification type={notification.type} message={notification.message} />
  );
  const invoiceFormComponent = isFormOpen && (
    <Suspense fallback={<Spinner />}>
      <InvoiceForm editingInvoice={fetchedInvoice} />
    </Suspense>
  );
  const handleCloseForm = () => {
    dispatch(uiActions.closeForm());
    if (isEditMode) {
      dispatch(invoicesActions.cancelEdit());
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "calc(100vh - 60px)",
        overflowY: isFormOpen ? "hidden" : "auto",
      }}
    >
      <Backdrop
        sx={{ zIndex: 1 }}
        open={isFormOpen}
        onClick={handleCloseForm}
      />
      {invoiceFormComponent}
      <Box padding={2}>
        {displayedNotification}
        <GoBackBtn click={() => router.back()} />
        {invoiceOptions}
        {invoiceOverview}
      </Box>
      {!matches && (
        <InvoiceControls
          onDelete={() => dispatch(uiActions.openDeleteConfirm())}
          onStatusChange={() => dispatch(markInvoiceAsPaid(id))}
        />
      )}
      {!!open && <ConfirmAlert id={id} />}
    </Box>
  );
};
export default InvoiceDetails;
