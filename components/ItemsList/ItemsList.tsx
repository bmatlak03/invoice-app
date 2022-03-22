import { Box, Typography, Paper, useTheme, useMediaQuery } from "@mui/material";
import InvoiceItem from "./InvoiceItem";
type Props = {};

const ItemsList = (props: Props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const itemsSummaryStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
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
      <Typography color="text.primary" fontWeight={700} fontSize={24}>
        $ 556.00
      </Typography>
    </Box>
  );
  return (
    <Paper
      sx={{
        marginTop: 3,
        borderRadius: "10px",
      }}
    >
      {!!matches && itemsLabel}
      <InvoiceItem
        itemName="Banner Design"
        itemQty={1}
        itemPrice={156.0}
        total={156.0}
      />
      {itemsSummary}
    </Paper>
  );
};
export default ItemsList;
