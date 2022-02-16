import type { NextPage } from "next";
import { List, Box } from "@mui/material";
import DUMMY_INVOICES from "../data.json";
import InvoicesAction from "../components/InvoicesAction/InvoicesAction";
import Invoice from "../components/Invoice/Invoice";
const Home: NextPage = () => {
  console.log(DUMMY_INVOICES);
  return (
    <Box sx={{ padding: 2 }}>
      <InvoicesAction />
      <List>
        {DUMMY_INVOICES.map((invoice) => (
          <Invoice
            key={invoice.id}
            id={invoice.id}
            paymentDue={invoice.paymentDue}
            clientName={invoice.clientName}
            status={invoice.status}
            total={invoice.total}
          />
        ))}
      </List>
    </Box>
  );
};

export default Home;
