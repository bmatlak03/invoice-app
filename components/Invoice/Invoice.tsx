import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
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
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const cardStyles: {} = {
    width: "100%",
    marginTop: 2,
    backgroundColor: theme.palette.primary.light,
    borderRadius: "10px",
    border: "2px solid transparent",
    "&:hover": {
      border: `2px solid ${theme.palette.secondary.main}`,
    },
  };
  return (
    <Card sx={cardStyles} onClick={() => console.log("invoice click")}>
      <CardActionArea>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography
            order={matches ? -1 : 0}
            color="text.secondary"
            width={!matches ? "50%" : "auto"}
          >
            #
            <Typography component="span" color="text.primary" fontWeight={600}>
              {id}
            </Typography>
          </Typography>
          <Typography color="text.secondary">{clientName}</Typography>

          <Typography
            order={matches ? -1 : 0}
            width={!matches ? "100%" : "auto"}
            color="text.secondary"
          >
            Due {paymentDue}
          </Typography>
          <Typography
            variant="h5"
            fontWeight={600}
            sx={{ width: matches ? "20%" : "auto", overflow: "hidden" }}
          >
            ${total}
          </Typography>
          <InvoiceStatus status={status} />
          {!!matches && (
            <KeyboardArrowDownIcon
              color="secondary"
              sx={{ transform: "rotate(-90deg)" }}
            />
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default Invoice;
