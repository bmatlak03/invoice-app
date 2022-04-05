import { MongoClient, ObjectId } from "mongodb";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { invoicesActions } from "../../store/invoices-slice";
import { InvoiceType } from "../../store/invoices-slice";
import InvoiceDetails from "../../components/InvoiceDetails/InvoiceDetails";

type Props = {
  invoiceData: InvoiceType;
};

const InvoiceDetailsPage = (props: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(invoicesActions.insertFetchedInvoice(props.invoiceData));
  }, [dispatch, props.invoiceData]);
  return (
    <>
      <Head>
        <title>Invoice {props.invoiceData.id}</title>
      </Head>
      <InvoiceDetails />
    </>
  );
};
export const getStaticPaths: GetStaticPaths = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://bartek:${process.env.REACT_APP_MONGODB_PASS}@cluster0.j0lnf.mongodb.net/invoicesDatabase?retryWrites=true&w=majority`
  );
  const db = client.db();

  const invoicesCollection = db.collection("invoices");
  const id: any = { _id: 1 };
  const invoices = await invoicesCollection.find({}, id).toArray();

  client.close();

  return {
    fallback: "blocking",
    paths: invoices.map((invoice) => ({
      params: { invoiceId: invoice._id.toString() },
    })),
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id: any = context?.params?.invoiceId;

  const client = await MongoClient.connect(
    `mongodb+srv://bartek:${process.env.REACT_APP_MONGODB_PASS}@cluster0.j0lnf.mongodb.net/invoicesDatabase?retryWrites=true&w=majority`
  );
  const db = client.db();
  const invoicesCollection = db.collection("invoices");
  const selectedInvoice = await invoicesCollection.findOne({
    _id: new ObjectId(id),
  });
  client.close();

  return {
    props: {
      invoiceData: {
        id: selectedInvoice?._id.toString(),
        status: selectedInvoice?.status,
        description: selectedInvoice?.description,
        createdAt: selectedInvoice?.createdAt,
        paymentDue: selectedInvoice?.paymentDue,
        paymentTerms: selectedInvoice?.paymentTerms,
        clientName: selectedInvoice?.clientName,
        clientEmail: selectedInvoice?.clientEmail,
        senderAddress: selectedInvoice?.senderAddress,
        clientAddress: selectedInvoice?.clientAddress,
        items: selectedInvoice?.items,
        total: selectedInvoice?.total,
      },
    },
  };
};
export default InvoiceDetailsPage;
