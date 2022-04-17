import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { List } from "@mui/material";
import NoInvoices from "../UI/NoInvoices/NoInvoices";
import Invoice from "./Invoice/Invoice";
import classes from "../../css/scroll-disable.module.css";

const Invoices = ({}) => {
  const { currentInvoices } = useSelector((state: RootState) => state.invoices);
  const renderedInvoices = currentInvoices.map((invoice) => (
    <Invoice
      key={invoice.id}
      id={invoice.id}
      paymentDue={invoice.paymentDue}
      clientName={invoice.clientName}
      status={invoice.status}
      total={invoice.total}
    />
  ));
  const invoicesListStyles = { height: "80vh", overflowY: "scroll" };
  const displayedInvoices =
    currentInvoices.length !== 0 ? renderedInvoices : <NoInvoices />;
  return (
    <List sx={invoicesListStyles} className={classes.List}>
      {displayedInvoices}
    </List>
  );
};
export default Invoices;
