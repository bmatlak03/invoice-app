import type { NextPage } from "next";
import { List, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import EmptyInvoicesIMG from "../assets/illustration-empty.svg";
import InvoicesAction from "../components/InvoicesAction/InvoicesAction";
import { RootState } from "../store";
import Invoice from "../components/Invoice/Invoice";
import Image from "next/image";
const Home: NextPage = () => {
  const invoices = useSelector((state: RootState) => state.invoices.invoices);
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
  return (
    <>
      <Box sx={{ padding: 2 }}>
        <InvoicesAction />
        <List>{invoices.length !== 0 ? renderedInvoices : noInvoicesInfo}</List>
      </Box>
    </>
  );
};

export default Home;
