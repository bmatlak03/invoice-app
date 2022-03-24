import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { KeyboardArrowDown as KeyboardArrowDownIcon } from "@mui/icons-material";
import InvoiceStatus from "../../components/InvoiceStatus/InvoiceStatus";
import ItemsList from "../../components/ItemsList/ItemsList";
import InvoiceControls from "../../components/InvoiceControls/InvoiceControls";
type Props = {};

const InvoiceDetails = ({}: Props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const goBackBtn = (
    <Button
      sx={{
        textTransform: "capitalize",
        color: theme.palette.mode === "dark" ? "white" : "black",
        fontSize: "1rem",
      }}
      onClick={() => null}
      startIcon={
        <KeyboardArrowDownIcon
          color="secondary"
          sx={{
            transform: "rotate(90deg)",
          }}
        />
      }
    >
      Go back
    </Button>
  );
  const boxStyles = {
    display: "flex",
    backgroundColor: theme.palette.primary.light,
    padding: 3,
    borderRadius: "10px",
  };
  const invoiceOptions = (
    <Box
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 2,
        ...boxStyles,
      }}
    >
      <Typography>Status</Typography>
      <InvoiceStatus status="paid" />
      {!!matches && <InvoiceControls />}
    </Box>
  );
  const invoiceId = (
    <Typography color="text.secondary">
      #
      <Typography component="span" color="text.primary" fontWeight={600}>
        XM9141
      </Typography>
    </Typography>
  );
  const streetAddressInfo = (
    <Box marginTop={!matches ? 2 : 0}>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        19 Union Terrace
      </Typography>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        London
      </Typography>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        E1 3EZ
      </Typography>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        United Kingdom
      </Typography>
    </Box>
  );
  const dateInfos = (
    <Box>
      <Box marginTop={2}>
        <Typography variant="subtitle2" color="text.secondary">
          Invoice Date
        </Typography>
        <Typography component="span" color="text.primary" fontWeight={600}>
          21 Aug 2022
        </Typography>
      </Box>
      <Box marginTop={2}>
        <Typography variant="subtitle2" color="text.secondary">
          PaymentDue
        </Typography>
        <Typography component="span" color="text.primary" fontWeight={600}>
          20 Sep 2022
        </Typography>
      </Box>
    </Box>
  );
  const clientEmail = (
    <Box mt={2}>
      <Typography variant="subtitle2" color="text.secondary">
        Sent To
      </Typography>
      <Typography component="span" color="text.primary" fontWeight={600}>
        alexgrim@mail.com
      </Typography>
    </Box>
  );
  const clientDetails = (
    <Box marginTop={2}>
      <Typography variant="subtitle2" color="text.secondary">
        Bill To
      </Typography>
      <Typography component="span" color="text.primary" fontWeight={600}>
        Alex Grim
      </Typography>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        84 Church Way
      </Typography>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        Bradford
      </Typography>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        BD1 9PB
      </Typography>
      <Typography variant="body2" color="text.secondary" fontSize={12}>
        United Kingdom
      </Typography>
    </Box>
  );
  const details = (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {dateInfos}
      {clientDetails}
      {clientEmail}
    </Box>
  );
  const invoiceOverview = (
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
          {invoiceId}
          <Typography variant="subtitle2" color="text.secondary">
            Graphic Design
          </Typography>
        </Box>
        {streetAddressInfo}
      </Box>
      {details}
      <ItemsList />
    </Box>
  );
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "calc(100vh - 60px)",
      }}
    >
      <Box padding={2}>
        {goBackBtn}
        {invoiceOptions}
        {invoiceOverview}
      </Box>
      {!matches && <InvoiceControls />}
    </Box>
  );
};
export default InvoiceDetails;
