import { Box, Typography } from "@mui/material";

type Props = {
  email: string;
};

const ClientEmail = ({ email }: Props) => {
  return (
    <Box mt={2}>
      <Typography variant="subtitle2" color="text.secondary">
        Sent To
      </Typography>
      <Typography component="span" color="text.primary" fontWeight={600}>
        {email}
      </Typography>
    </Box>
  );
};

export default ClientEmail;
