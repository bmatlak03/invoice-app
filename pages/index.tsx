import type { NextPage } from "next";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { invoicesActions, InvoiceType } from "../store/invoices-slice";
import { uiActions } from "../store/ui-slice";
import { getSession } from "next-auth/react";
import { Box, Backdrop, useMediaQuery, useTheme } from "@mui/material";
import InvoicesAction from "../components/InvoicesAction/InvoicesAction";
import Spinner from "../components/UI/Spinner/Spinner";
import Invoices from "../components/Invoices/Invoices";
import { connectToDatabase } from "../lib/db";
const InvoiceForm = lazy(() => import("../components/InvoiceForm/InvoiceForm"));
type FetchedInvoices = {
  fetchedInvoices: InvoiceType;
};
const Home: NextPage<FetchedInvoices> = (props) => {
  const { isFormOpen } = useSelector((state: RootState) => state.ui);
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

  return (
    <>
      <Head>
        <title>Invoice App</title>
        <meta name="description" content="Manage your invoices in one place!" />
      </Head>
      <Box padding={2}>
        <InvoicesAction />
        <Invoices />
        {invoiceFormComponent}
        {backdrop}
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  const client = await connectToDatabase();
  const db = client.db();

  // const invoicesCollection = db.collection("invoices");

  const user = await db
    .collection("users")
    .find({ email: session?.user?.email })
    .toArray();
  const invoices = user[0].invoices;
  client.close();

  return {
    props: {
      fetchedInvoices: invoices.map((invoice: InvoiceType) => ({
        id: invoice.id,
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
  };
};
export default Home;
