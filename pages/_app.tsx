import type { AppProps } from "next/app";
import Router from "next/router";
import { Provider } from "react-redux";
import store from "../store/index";
import Layout from "../components/UI/Layout/Layout";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { SessionProvider } from "next-auth/react";
import "../css/nprogress.css";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false });
const handleRouteChange = () => NProgress.start();
const handleRouteComplete = () => NProgress.done();

Router.events.on("routeChangeStart", handleRouteChange);
Router.events.on("routeChangeComplete", handleRouteComplete);
Router.events.on("routeChangeError", handleRouteComplete);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LocalizationProvider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
