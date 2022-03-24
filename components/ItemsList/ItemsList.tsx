import { Box, Typography, Paper, useTheme, useMediaQuery } from "@mui/material";
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

  const itemsSummaryStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    backgroundColor:
      theme.palette.mode === "dark" ? "#000" : theme.palette.primary.main,
    padding: 2,
    borderRadius: "10px",
  };
  const itemsLabel = (
    <Box sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}>
      <Typography>Item Name</Typography>
      <Typography>QTY.</Typography>
      <Typography>Price</Typography>
      <Typography>Total</Typography>
    </Box>
  );
  const itemsSummary = (
    <Box sx={itemsSummaryStyles}>
      Amount Due{" "}
      <Typography color="white" fontWeight={700} fontSize={30}>
        ${totalPrice.toFixed(2)}
      </Typography>
    </Box>
  );
  return (
    <Paper
      sx={{
        marginTop: 3,
        borderRadius: "10px",
        backgroundColor:
          theme.palette.mode === "dark" ? "transparent" : "#F9FAFE",
      }}
    >
      {!!matches && itemsLabel}
      {items.map((item) => (
        <InvoiceItem
          key={item.name}
          itemName={item.name}
          itemQty={item.quantity}
          itemPrice={item.price}
          total={item.total}
        />
      ))}
      {itemsSummary}
    </Paper>
  );
};
export default ItemsList;
