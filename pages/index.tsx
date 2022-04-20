import type { NextPage } from "next";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { invoicesActions } from "../store/invoices-slice";
import { uiActions } from "../store/ui-slice";
import { getSession } from "next-auth/react";
import { InvoiceType } from "../types/types";
import { Box, Backdrop, useMediaQuery, useTheme } from "@mui/material";
import InvoicesAction from "../components/Invoices/InvoicesAction/InvoicesAction";
import Spinner from "../components/UI/Spinner/Spinner";
import Invoices from "../components/Invoices/Invoices";
import { connectToDatabase } from "../lib/libs";
const InvoiceForm = lazy(
  () => import("../components/Invoices/Invoice/InvoiceForm/InvoiceForm")
);
type FetchedInvoices = {
  fetchedInvoices: InvoiceType;
  avatar: string;
};
const Home: NextPage<FetchedInvoices> = (props) => {
  const { isFormOpen } = useSelector((state: RootState) => state.ui);
  const { fetchedInvoices, avatar } = props;
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  useEffect(() => {
    dispatch(invoicesActions.insertFetchedInvoices(fetchedInvoices));
    dispatch(uiActions.setAvatar(avatar));
  }, [dispatch, fetchedInvoices, avatar]);

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
  const user = await db
    .collection("users")
    .find({ email: session?.user?.email })
    .toArray();
  const invoices = user[0].invoices;
  const avatar = user[0].avatar;
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
      avatar: avatar,
    },
  };
};
export default Home;
