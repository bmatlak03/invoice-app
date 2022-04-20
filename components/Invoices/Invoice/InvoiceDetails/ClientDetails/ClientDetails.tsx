import { Box, Typography } from "@mui/material";

export interface ClientDetailsType {
  clientInfo: {
    name: string;
    address: {
      street: string;
      city: string;
      postCode: string;
      country: string;
    };
  };
}

const ClientDetails = ({ clientInfo }: ClientDetailsType) => {
  return (
    <Box marginTop={2}>
      <Typography variant="subtitle2" color="text.secondary">
        Bill To
      </Typography>
      <Typography component="span" color="text.primary" fontWeight={600}>
        {clientInfo.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        {clientInfo.address.street}
      </Typography>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        {clientInfo.address.city}
      </Typography>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        {clientInfo.address.postCode}
      </Typography>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        {clientInfo.address.country}
      </Typography>
    </Box>
  );
};
export default ClientDetails;
