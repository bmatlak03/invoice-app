import { Typography } from "@mui/material";

type Props = {
  id: string;
};

const InvoiceId = ({ id }: Props) => {
  return (
    <Typography color="text.secondary">
      #
      <Typography component="span" color="text.primary" fontWeight={600}>
        {id}
      </Typography>
    </Typography>
  );
};

export default InvoiceId;
