import Head from "next/head";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { invoicesActions } from "../../store/invoices-slice";
import { getSession } from "next-auth/react";
import { InvoiceType } from "../../types/types";
import { connectToDatabase } from "../../lib/libs";
import InvoiceDetails from "../../components/Invoices/Invoice/InvoiceDetails/InvoiceDetails";
type Props = {
  invoiceData: InvoiceType;
};

const InvoiceDetailsPage = ({ invoiceData }: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(invoicesActions.insertFetchedInvoice(invoiceData));
  }, [dispatch, invoiceData]);
  return (
    <>
      <Head>
        <title>Invoice {invoiceData.id}</title>
      </Head>
      <InvoiceDetails />
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
  const id = context?.params?.invoiceId;
  const db = client.db();

  const user = await db
    .collection("users")
    .find({ email: session?.user?.email })
    .toArray();
  const invoices = user[0].invoices;
  const selectedInvoice: InvoiceType[] = invoices.filter(
    (invoice: InvoiceType) => invoice.id === id
  );
  if (selectedInvoice.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  client.close();

  return {
    props: {
      invoiceData: {
        id: selectedInvoice[0].id,
        status: selectedInvoice[0].status,
        description: selectedInvoice[0].description,
        createdAt: selectedInvoice[0].createdAt,
        paymentDue: selectedInvoice[0].paymentDue,
        paymentTerms: selectedInvoice[0].paymentTerms,
        clientName: selectedInvoice[0].clientName,
        clientEmail: selectedInvoice[0].clientEmail,
        senderAddress: selectedInvoice[0].senderAddress,
        clientAddress: selectedInvoice[0].clientAddress,
        items: selectedInvoice[0].items,
        total: selectedInvoice[0].total,
      },
    },
  };
};
export default InvoiceDetailsPage;
