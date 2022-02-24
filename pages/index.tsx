import type { NextPage } from "next";
import { lazy, Suspense } from "react";
import { List, Box, Typography, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import EmptyInvoicesIMG from "../assets/illustration-empty.svg";
import InvoicesAction from "../components/InvoicesAction/InvoicesAction";
import { RootState } from "../store";
import Invoice from "../components/Invoice/Invoice";
import Image from "next/image";
const Home: NextPage = () => {
  const { invoices, isFormOpen } = useSelector(
    (state: RootState) => state.invoices
  );
  console.log(invoices);
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
  const renderedInvoices = invoices.map(
    (invoice: {
      id: string;
      paymentDue: string;
      clientName: string;
      status: string;
      total: number;
    }) => (
      <Invoice
        key={invoice.id}
        id={invoice.id}
        paymentDue={invoice.paymentDue}
        clientName={invoice.clientName}
        status={invoice.status}
        total={invoice.total}
      />
    )
  );
  const NewInvoiceForm = lazy(
    () => import("../components/NewInvoiceForm/NewInvoiceForm")
  );
  return (
    <>
      <Box sx={{ padding: 2, position: "relative" }}>
        <InvoicesAction />
        <List>{invoices.length !== 0 ? renderedInvoices : noInvoicesInfo}</List>
        {isFormOpen && (
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
                <CircularProgress />
              </Box>
            }
          >
            <NewInvoiceForm />
          </Suspense>
        )}
      </Box>
    </>
  );
};

export default Home;
