import type { AppProps } from "next/app";
import Router from "next/router";
import { Provider } from "react-redux";
import store from "../store/index";
import Layout from "../components/UI/Layout/Layout";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { SessionProvider } from "next-auth/react";
import "../css/nprogress.css";
import dynamic from "next/dynamic";
const TopProgressBar = dynamic(
  () => {
    return import("../components/UI/TopProgressBar/TopProgressBar");
  },
  { ssr: false }
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Layout>
            <TopProgressBar />
            <Component {...pageProps} />
          </Layout>
        </LocalizationProvider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
