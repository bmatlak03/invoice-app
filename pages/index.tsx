import type { NextPage } from "next";
import { lazy, Suspense } from "react";
import {
  List,
  Box,
  Typography,
  CircularProgress,
  Backdrop,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import EmptyInvoicesIMG from "../assets/illustration-empty.svg";
import InvoicesAction from "../components/InvoicesAction/InvoicesAction";
import { RootState } from "../store";
import Invoice from "../components/Invoice/Invoice";
import Image from "next/image";
import { invoicesActions } from "../store/invoices-slice";
import classes from "../css/scroll-disable.module.css";
const NewInvoiceForm = lazy(
  () => import("../components/NewInvoiceForm/NewInvoiceForm")
);
const Home: NextPage = () => {
  const { invoices, isFormOpen } = useSelector(
    (state: RootState) => state.invoices
  );
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const noInvoicesInfo = (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Image src={EmptyInvoicesIMG} alt="no invoices yet" />
      <Typography sx={{ fontWeight: "bold" }} variant="h4">
        There is nothing here
      </Typography>
      <Typography color="text.secondary">
        Create an invoice by clicking the{" "}
        <Typography sx={{ fontWeight: "bold" }} component="span">
          New
        </Typography>{" "}
        button and get started
      </Typography>
    </Box>
  );
  const renderedInvoices = invoices.map((invoice) => (
    <Invoice
      key={invoice.id}
      id={invoice.id}
      paymentDue={invoice.paymentDue}
      clientName={invoice.clientName}
      status={invoice.status}
      total={invoice.total}
    />
  ));

  const backdrop = !!matches && (
    <Backdrop
      open={isFormOpen}
      onClick={() => dispatch(invoicesActions.closeForm())}
    />
  );
  const newInvoiceFormComponent = isFormOpen && (
    <Suspense
      fallback={
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            textAlign: "center",
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      }
    >
      <NewInvoiceForm />
    </Suspense>
  );
  const displayedInvoices =
    invoices.length !== 0 ? renderedInvoices : noInvoicesInfo;
  return (
    <>
      <Box sx={{ padding: 2 }}>
        <InvoicesAction />
        <List
          sx={{ height: "80vh", overflowY: "scroll" }}
          className={classes.List}
        >
          {displayedInvoices}
        </List>
        {newInvoiceFormComponent}
        {backdrop}
      </Box>
    </>
  );
};

export default Home;
