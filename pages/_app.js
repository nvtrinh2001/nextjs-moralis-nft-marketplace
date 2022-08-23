import Head from "next/head";
import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import Header from "../components/Header";
import { NotificationProvider } from "web3uikit";

const MORALIS_DAPP_URL = process.env.NEXT_PUBLIC_MORALIS_DAPP_URL;
const MORALIS_APP_ID = process.env.NEXT_PUBLIC_MORALIS_APP_ID;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>NFT Marketplace</title>
        <meta name="description" content="NFT Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MoralisProvider appId={MORALIS_APP_ID} serverUrl={MORALIS_DAPP_URL}>
        <NotificationProvider>
          <Header />
          <Component {...pageProps} />;
        </NotificationProvider>
      </MoralisProvider>
    </>
  );
}

export default MyApp;
