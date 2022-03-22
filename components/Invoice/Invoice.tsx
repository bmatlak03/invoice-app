import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/router";
import { KeyboardArrowDown as KeyboardArrowDownIcon } from "@mui/icons-material/";
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
  const router = useRouter();
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
  const cardContentStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  };
  const totalPriceStyles = {
    width: matches ? "20%" : "auto",
    overflow: "hidden",
  };
  const arrowIcon = !!matches && (
    <KeyboardArrowDownIcon
      color="secondary"
      sx={{ transform: "rotate(-90deg)" }}
    />
  );
  return (
    <Card sx={cardStyles} onClick={() => router.push(`/${id}`)}>
      <CardActionArea>
        <CardContent sx={cardContentStyles}>
          <Typography
            order={matches ? -1 : 0}
            color="text.secondary"
            overflow="hidden"
            width={!matches ? "40%" : "15%"}
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
          <Typography variant="h5" fontWeight={600} sx={totalPriceStyles}>
            ${total}
          </Typography>
          <InvoiceStatus status={status} />
          {arrowIcon}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default Invoice;
