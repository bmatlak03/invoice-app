import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store/index";
import Layout from "../components/UI/Layout/Layout";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LocalizationProvider>
    </Provider>
  );
}

export default MyApp;
