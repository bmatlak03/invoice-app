import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "../store/index";
import Layout from "../components/UI/Layout/Layout";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import "../css/nprogress.css";
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
