import { TableCell, TableRow, useMediaQuery, useTheme } from "@mui/material";
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
  const rowStyles = { display: "flex", flexWrap: "wrap" };
  const cellStyles = {
    fontWeight: 700,
    border: "none",
    // width: "20%",
  };
  return (
    <TableRow sx={!matches ? rowStyles : {}} key={itemName}>
      <TableCell
        component="th"
        scope="row"
        sx={{ ...cellStyles, width: "100%" }}
      >
        {itemName}
      </TableCell>
      <TableCell sx={cellStyles} align="center">
        {matches ? itemQty : `${itemQty}x`}
      </TableCell>
      <TableCell sx={cellStyles} align="center">
        ${itemPrice.toFixed(2)}
      </TableCell>
      <TableCell sx={cellStyles} align="center">
        ${total.toFixed(2)}
      </TableCell>
    </TableRow>
  );
};

export default InvoiceItem;
