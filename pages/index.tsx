import type { NextPage } from "next";
import DUMMY_INVOICES from "../data.json";
import InvoicesAction from "../components/InvoicesAction/InvoicesAction";
const Home: NextPage = () => {
  console.log(DUMMY_INVOICES);
  return <InvoicesAction />;
};

export default Home;
