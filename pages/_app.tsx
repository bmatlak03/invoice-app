import type { AppProps } from "next/app";
import Layout from "../components/UI/Layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
