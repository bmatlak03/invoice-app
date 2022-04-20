import { Box } from "@mui/material";
import ClientDetails, {
  ClientDetailsType,
} from "../ClientDetails/ClientDetails";
import ClientEmail from "../ClientEmail/ClientEmail";
import InvoiceDates from "../InvoiceDates/InvoiceDates";

type Props = {
  createdAt: string;
  paymentDue: string;
  email: string;
} & ClientDetailsType;

const InvoiceAmplification = ({
  createdAt,
  paymentDue,
  clientInfo,
  email,
}: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      <InvoiceDates createdAt={createdAt} paymentDue={paymentDue} />
      <ClientDetails clientInfo={clientInfo} />
      <ClientEmail email={email} />
    </Box>
  );
};

export default InvoiceAmplification;
