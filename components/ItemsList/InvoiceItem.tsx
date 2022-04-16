import { TableCell, TableRow, useMediaQuery, useTheme } from "@mui/material";
import { ItemsType } from "../../types/types";

const InvoiceItem = (props: ItemsType) => {
  const { name, price, quantity, total, id } = props;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const rowStyles = { display: "flex", flexWrap: "wrap" };
  const cellStyles = {
    fontWeight: 700,
    border: "none",
    // width: "20%",
  };
  return (
    <TableRow sx={!matches ? rowStyles : {}} key={id}>
      <TableCell
        component="th"
        scope="row"
        sx={{ ...cellStyles, width: "100%" }}
      >
        {name}
      </TableCell>
      <TableCell sx={cellStyles} align="center">
        {matches ? quantity : `${quantity}x`}
      </TableCell>
      <TableCell sx={cellStyles} align="center">
        ${price.toFixed(2)}
      </TableCell>
      <TableCell sx={cellStyles} align="center">
        ${total.toFixed(2)}
      </TableCell>
    </TableRow>
  );
};

export default InvoiceItem;
