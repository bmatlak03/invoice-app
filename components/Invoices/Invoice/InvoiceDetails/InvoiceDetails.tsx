import { useRouter } from "next/router";
import { lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { invoicesActions } from "../../../../store/invoices-slice";
import { uiActions } from "../../../../store/ui-slice";
import { RootState } from "../../../../store";
import { markInvoiceAsPaid } from "../../../../store/invoices-actions";
import { Box, useMediaQuery, useTheme, Backdrop } from "@mui/material";
import InvoiceControls from "../InvoiceControls/InvoiceControls";
import ConfirmAlert from "../../../UI/ConfirmAlert/ConfirmAlert";
import GoBackBtn from "../../../UI/GoBackBtn/GoBackBtn";
import Spinner from "../../../UI/Spinner/Spinner";
import InvoiceDashboard from "./InvoiceDashboard/InvoiceDashboard";
import InvoiceOverview from "./InvoiceOverview/InvoiceOverview";
const InvoiceForm = lazy(() => import("../InvoiceForm/InvoiceForm"));

const InvoiceDetails = () => {
  const dispatch = useDispatch();
  const { isDeleteConfirmOpen: open } = useSelector(
    (state: RootState) => state.ui
  );
  const { fetchedInvoice, isEditMode } = useSelector(
    (state: RootState) => state.invoices
  );
  const { isFormOpen } = useSelector((state: RootState) => state.ui);
  const theme = useTheme();
  const router = useRouter();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { id, status } = fetchedInvoice;
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
  const handleGoBack = () => router.back();
  const handleDeleteInvoice = () => dispatch(uiActions.openDeleteConfirm());
  const handleChangeInvoiceStatus = () => dispatch(markInvoiceAsPaid(id));
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
        <GoBackBtn click={handleGoBack} />
        <InvoiceDashboard status={status} id={id} />
        <InvoiceOverview />
      </Box>
      {!matches && (
        <InvoiceControls
          onDelete={handleDeleteInvoice}
          onStatusChange={handleChangeInvoiceStatus}
        />
      )}
      {!!open && <ConfirmAlert id={id} />}
    </Box>
  );
};
export default InvoiceDetails;
