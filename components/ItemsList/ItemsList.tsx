import {
  Box,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import InvoiceItem from "./InvoiceItem";
type Props = {
  items: [
    {
      name: string;
      quantity: number;
      price: number;
      total: number;
    }
  ];
  totalPrice: number;
};

const ItemsList = ({ items, totalPrice }: Props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const tableStyles = {
    marginTop: 3,
    borderRadius: "10px",
    backgroundColor: theme.palette.mode === "dark" ? "transparent" : "#F9FAFE",
  };
  const itemsSummaryStyles = {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    backgroundColor:
      theme.palette.mode === "dark" ? "#000" : theme.palette.primary.main,
    padding: 2,
    borderRadius: "10px",
  };
  const itemsSummary = (
    <Box sx={itemsSummaryStyles}>
      Amount Due{" "}
      <Typography color="white" fontWeight={700} fontSize={30}>
        ${totalPrice?.toFixed(2)}
      </Typography>
    </Box>
  );
  const tableLabels = matches ? (
    <TableHead>
      <TableRow>
        <TableCell>Item Name</TableCell>
        <TableCell align="center">QTY.</TableCell>
        <TableCell align="center">Price</TableCell>
        <TableCell align="center">Total</TableCell>
      </TableRow>
    </TableHead>
  ) : null;
  return (
    <TableContainer component={Paper} sx={tableStyles}>
      <Table>
        {tableLabels}
        <TableBody>
          {items.map((item) => (
            <InvoiceItem
              key={item.name}
              itemName={item.name}
              itemPrice={item.price}
              itemQty={item.quantity}
              total={item.total}
            />
          ))}
        </TableBody>
      </Table>
      {itemsSummary}
    </TableContainer>
  );
};
export default ItemsList;
