import type { NextPage } from "next";
import Head from "next/head";
import { GetStaticProps } from "next";
import { MongoClient } from "mongodb";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { invoicesActions, InvoiceType } from "../store/invoices-slice";
import { uiActions } from "../store/ui-slice";
import { Box, Backdrop, useMediaQuery, useTheme } from "@mui/material";
import InvoicesAction from "../components/InvoicesAction/InvoicesAction";
import Spinner from "../components/UI/Spinner/Spinner";
import Invoices from "../components/Invoices/Invoices";
import Notification from "../components/UI/Notification/Notification";
const InvoiceForm = lazy(() => import("../components/InvoiceForm/InvoiceForm"));
type FetchedInvoices = {
  fetchedInvoices: InvoiceType;
};
const Home: NextPage<FetchedInvoices> = (props) => {
  const { isFormOpen, notification } = useSelector(
    (state: RootState) => state.ui
  );
  const { fetchedInvoices } = props;
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  useEffect(() => {
    dispatch(invoicesActions.insertFetchedInvoices(fetchedInvoices));
  }, [dispatch, fetchedInvoices]);

  const backdrop = !!matches && (
    <Backdrop
      open={isFormOpen}
      onClick={() => dispatch(uiActions.closeForm())}
    />
  );
  const invoiceFormComponent = isFormOpen && (
    <Suspense fallback={<Spinner />}>
      <InvoiceForm />
    </Suspense>
  );
  const displayedNotification = notification.isShow && (
    <Notification type={notification.type} message={notification.message} />
  );

  return (
    <>
      <Head>
        <title>Invoice App</title>
        <meta name="description" content="Manage your invoices in one place!" />
      </Head>
      <Box padding={2}>
        {displayedNotification}
        <InvoicesAction />
        <Invoices />
        {invoiceFormComponent}
        {backdrop}
      </Box>
    </>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const client = await MongoClient.connect(
    `${process.env.REACT_APP_MONGODB_URL}`
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
