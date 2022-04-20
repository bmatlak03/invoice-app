import { Box, Typography } from "@mui/material";

type Props = {
  createdAt: string;
  paymentDue: string;
};

const InvoiceDates = ({ createdAt, paymentDue }: Props) => {
  return (
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
};

export default InvoiceDates;
