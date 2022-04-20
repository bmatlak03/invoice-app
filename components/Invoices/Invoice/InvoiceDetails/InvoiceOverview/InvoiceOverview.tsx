import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import ItemsList from "../../../../ItemsList/ItemsList";
import InvoiceAmplification from "../InvoiceAmplification/InvoiceAmplification";
import InvoiceId from "../InvoiceId/InvoiceId";
import SenderAddress from "../SenderAddress/SenderAddress";

const InvoiceOverview = () => {
  const { fetchedInvoice } = useSelector((state: RootState) => state.invoices);
  const {
    id,
    description,
    senderAddress,
    items,
    total,
    clientName,
    clientAddress,
    createdAt,
    paymentDue,
    clientEmail,
  } = fetchedInvoice;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const boxStyles = {
    display: "flex",
    backgroundColor: theme.palette.primary.light,
    padding: 3,
    borderRadius: "10px",
  };
  const clientInfo = { name: clientName, address: clientAddress };
  return (
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
          <InvoiceId id={id} />
          <Typography variant="subtitle2" color="text.secondary">
            {description}
          </Typography>
        </Box>
        <SenderAddress address={senderAddress} />
      </Box>
      <InvoiceAmplification
        clientInfo={clientInfo}
        createdAt={createdAt}
        paymentDue={paymentDue}
        email={clientEmail}
      />
      <ItemsList items={items} totalPrice={total} />
    </Box>
  );
};

export default InvoiceOverview;
