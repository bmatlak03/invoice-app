import type { NextPage } from "next";
import { GetStaticProps } from "next";
import Image from "next/image";
import { MongoClient } from "mongodb";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  List,
  Box,
  Typography,
  CircularProgress,
  Backdrop,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { RootState } from "../store";
import { invoicesActions } from "../store/invoices-slice";
import Invoice from "../components/Invoice/Invoice";
import InvoicesAction from "../components/InvoicesAction/InvoicesAction";
import EmptyInvoicesIMG from "../assets/illustration-empty.svg";
import classes from "../css/scroll-disable.module.css";
import { uiActions } from "../store/ui-slice";
const NewInvoiceForm = lazy(
  () => import("../components/NewInvoiceForm/NewInvoiceForm")
);
type FetchedInvoices = {
  fetchedInvoices: {
    id: string;
    status: string;
    clientName: string;
    clientEmail: string;
    clientAddress: {
      street: string;
      city: string;
      postCode: string;
      country: string;
    };
    description: string;
    senderAddress: {
      street: string;
      city: string;
      postCode: string;
      country: string;
    };
    createdAt: string;
    paymentDue: string;
    items: [
      {
        name: string;
        quantity: number;
        price: number;
        total: number;
      }
    ];
    total: number;
  };
};
const Home: NextPage<FetchedInvoices> = (props) => {
  const { currentInvoices } = useSelector((state: RootState) => state.invoices);
  const { isFormOpen } = useSelector((state: RootState) => state.ui);
  const { fetchedInvoices } = props;
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  useEffect(() => {
    dispatch(invoicesActions.insertFetchedInvoices(fetchedInvoices));
  }, [dispatch, fetchedInvoices]);
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
  const renderedInvoices = currentInvoices.map((invoice) => (
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
      onClick={() => dispatch(uiActions.closeForm())}
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
  const invoicesListStyles = { height: "80vh", overflowY: "scroll" };
  const displayedInvoices =
    currentInvoices.length !== 0 ? renderedInvoices : noInvoicesInfo;
  return (
    <>
      <Box padding={2}>
        <InvoicesAction />
        <List sx={invoicesListStyles} className={classes.List}>
          {displayedInvoices}
        </List>
        {newInvoiceFormComponent}
        {backdrop}
      </Box>
    </>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://bartek:${process.env.REACT_APP_MONGODB_PASS}@cluster0.j0lnf.mongodb.net/invoicesDatabase?retryWrites=true&w=majority`
  );
  const db = client.db();

  const invoicesCollection = db.collection("invoices");

  const invoices = await invoicesCollection.find().toArray();
  client.close();
  return {
    props: {
      fetchedInvoices: invoices.map((invoice) => ({
        id: invoice._id.toString(),
        createdAt: invoice.createdAt,
        paymentDue: invoice.paymentDue,
        description: invoice.description,
        paymentTerms: invoice.paymentTerms,
        clientName: invoice.clientName,
        clientEmail: invoice.clientEmail,
        status: invoice.status,
        senderAddress: invoice.senderAddress,
        clientAddress: invoice.clientAddress,
        items: invoice.items,
        total: invoice.total,
      })),
    },
    revalidate: 1,
  };
};
export default Home;
