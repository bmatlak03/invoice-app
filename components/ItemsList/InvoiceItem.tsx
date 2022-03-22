import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
type Props = {
  itemName: string;
  itemPrice: number;
  itemQty: number;
  total: number;
};

const InvoiceItem = (props: Props) => {
  const { itemName, itemPrice, itemQty, total } = props;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Typography
        color="text.primary"
        fontWeight={600}
        width={!matches ? "100%" : "auto"}
      >
        {itemName}
      </Typography>
      <Typography variant="subtitle2" component="span" color="text.secondary">
        {!matches ? `${itemQty}x ` : itemQty}
      </Typography>
      <Typography variant="subtitle2" component="span" color="text.secondary">
        ${itemPrice.toFixed(2)}
      </Typography>
      <Typography color="text.primary" fontWeight={600}>
        ${total.toFixed(2)}
      </Typography>
    </Box>
  );
};

export default InvoiceItem;
