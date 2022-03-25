import { MongoClient, ObjectId } from "mongodb";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { KeyboardArrowDown as KeyboardArrowDownIcon } from "@mui/icons-material";
import InvoiceStatus from "../../components/InvoiceStatus/InvoiceStatus";
import ItemsList from "../../components/ItemsList/ItemsList";
import InvoiceControls from "../../components/InvoiceControls/InvoiceControls";
import ConfirmAlert from "../../components/UI/ConfirmAlert/ConfirmAlert";
import { RootState } from "../../store";
import { markInvoiceAsPaid } from "../../store/invoices-actions";
type Props = {
  invoiceData: {
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

const InvoiceDetails = (props: Props) => {
  const {
    id,
    status,
    clientName,
    clientEmail,
    clientAddress,
    description,
    senderAddress,
    createdAt,
    paymentDue,
    items,
    total,
  } = props.invoiceData;
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.ui.isDeleteConfirmOpen);
  const theme = useTheme();
  const router = useRouter();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const goBackBtn = (
    <Button
      sx={{
        textTransform: "capitalize",
        color: theme.palette.mode === "dark" ? "white" : "black",
        fontSize: "1rem",
      }}
      onClick={() => router.push("/")}
      startIcon={
        <KeyboardArrowDownIcon
          color="secondary"
          sx={{
            transform: "rotate(90deg)",
          }}
        />
      }
    >
      Go back
    </Button>
  );
  const boxStyles = {
    display: "flex",
    backgroundColor: theme.palette.primary.light,
    padding: 3,
    borderRadius: "10px",
  };
  const invoiceOptions = (
    <Box
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 2,
        ...boxStyles,
      }}
    >
      <Typography>Status</Typography>
      <InvoiceStatus status={status} />
      {!!matches && (
        <InvoiceControls
          onDelete={() => dispatch(uiActions.openDeleteConfirm())}
          onStatusChange={() => dispatch(markInvoiceAsPaid(id))}
        />
      )}
    </Box>
  );
  const invoiceId = (
    <Typography color="text.secondary">
      #
      <Typography component="span" color="text.primary" fontWeight={600}>
        {id}
      </Typography>
    </Typography>
  );
  const streetAddressInfo = (
    <Box marginTop={!matches ? 2 : 0}>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        {senderAddress.street}
      </Typography>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        {senderAddress.city}
      </Typography>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        {senderAddress.postCode}
      </Typography>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        {senderAddress.city}
      </Typography>
    </Box>
  );
  const dateInfos = (
    <Box>
      <Box marginTop={2}>
        <Typography variant="subtitle2" color="text.secondary">
          Invoice Date
        </Typography>
        <Typography component="span" color="text.primary" fontWeight={600}>
          {createdAt}
        </Typography>
      </Box>
      <Box marginTop={2}>
        <Typography variant="subtitle2" color="text.secondary">
          PaymentDue
        </Typography>
        <Typography component="span" color="text.primary" fontWeight={600}>
          {paymentDue}
        </Typography>
      </Box>
    </Box>
  );
  const clientEmailBox = (
    <Box mt={2}>
      <Typography variant="subtitle2" color="text.secondary">
        Sent To
      </Typography>
      <Typography component="span" color="text.primary" fontWeight={600}>
        {clientEmail}
      </Typography>
    </Box>
  );
  const clientDetails = (
    <Box marginTop={2}>
      <Typography variant="subtitle2" color="text.secondary">
        Bill To
      </Typography>
      <Typography component="span" color="text.primary" fontWeight={600}>
        {clientName}
      </Typography>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        {clientAddress.street}
      </Typography>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        {clientAddress.city}
      </Typography>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        {clientAddress.postCode}
      </Typography>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        {clientAddress.country}
      </Typography>
    </Box>
  );
  const details = (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {dateInfos}
      {clientDetails}
      {clientEmailBox}
    </Box>
  );
  const invoiceOverview = (
    <Box
      sx={{
        marginTop: 2,
        ...boxStyles,
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          flexDirection: !matches ? "column" : "row",
        }}
      >
        <Box>
          {invoiceId}
          <Typography variant="subtitle2" color="text.secondary">
            {description}
          </Typography>
        </Box>
        {streetAddressInfo}
      </Box>
      {details}
      <ItemsList items={items} totalPrice={total} />
    </Box>
  );
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "calc(100vh - 60px)",
      }}
    >
      <Box padding={2}>
        {goBackBtn}
        {invoiceOptions}
        {invoiceOverview}
      </Box>
      {!matches && (
        <InvoiceControls
          onDelete={() => dispatch(uiActions.openDeleteConfirm())}
          onStatusChange={() => dispatch(markInvoiceAsPaid(id))}
        />
      )}
      {!!open && <ConfirmAlert id={id} />}
    </Box>
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
  const meetupId: any = context?.params?.invoiceId;

  const client = await MongoClient.connect(
    `mongodb+srv://bartek:${process.env.REACT_APP_MONGODB_PASS}@cluster0.j0lnf.mongodb.net/invoicesDatabase?retryWrites=true&w=majority`
  );
  const db = client.db();
  const invoicesCollection = db.collection("invoices");
  const selectedInvoice = await invoicesCollection.findOne({
    _id: new ObjectId(meetupId),
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
export default InvoiceDetails;
