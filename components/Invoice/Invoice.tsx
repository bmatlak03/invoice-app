import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import InvoiceStatus from "../InvoiceStatus/InvoiceStatus";
type Props = {
  id: string;
  paymentDue: string;
  clientName: string;
  status: string;
  total: number;
};
const Invoice: React.FC<Props> = ({
  id,
  paymentDue,
  clientName,
  status,
  total,
}) => {
  const theme = useTheme();
  const cardStyles: {} = {
    width: "100%",
    marginTop: 2,
    backgroundColor: theme.palette.primary.light,
  };
  return (
    <Card sx={cardStyles} onClick={() => console.log("invoice click")}>
      <CardActionArea>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 1,
            }}
          >
            <Typography color="text.secondary">
              #
              <Typography
                component="span"
                color="text.primary"
                sx={{ fontWeight: "bold" }}
              >
                {id}
              </Typography>
            </Typography>
            <Typography color="text.secondary">{clientName}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography color="text.secondary">{paymentDue}</Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                ${total}
              </Typography>
            </Box>
            <InvoiceStatus status={status} />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default Invoice;
