import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

interface Props {
  address: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
}

const SenderAddress = ({ address }: Props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Box marginTop={!matches ? 2 : 0}>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        {address.street}
      </Typography>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        {address.city}
      </Typography>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        {address.postCode}
      </Typography>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        {address.country}
      </Typography>
    </Box>
  );
};

export default SenderAddress;
