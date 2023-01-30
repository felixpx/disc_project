import React from "react";
import Web3Provider from "../src/context/Web3Context";
import { MoralisProvider } from "react-moralis";
import type { AppProps } from "next/app";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  if (!process.env.MORALIS_APPLICATION_ID || !process.env.MORALIS_SERVER_ID) {
    return (
      <>
        <h3>Moralis App_ID and Server_ID has not been set:</h3>
        <p>
          Follow the steps on the{" "}
          <a
            href="https://docs.moralis.io/getting-started/quick-start"
            target="_blank"
          >
            Moralis documentation
          </a>{" "}
          to create a new Moralis project. Then find your application's app id
          and server id and paste them in a root <b>.env</b> file for both{" "}
          <b>.env.development</b> and <b>.env.production</b> like so:
        </p>
        <pre>
          <code>
            MORALIS_APPLICATION_ID='[APP_ID]'
            <br />
            MORALIS_SERVER_ID='[SERVER_ID]'
          </code>
        </pre>
      </>
    );
  }
  return (
    <MoralisProvider
      appId={process.env.MORALIS_APPLICATION_ID || ""}
      serverUrl={process.env.MORALIS_SERVER_ID || ""}
    >
      <Web3Provider>
        {/* <ThemeProvider theme={theme}> */}
        {/* <Reset /> */}
        {/* <GlobalStyle /> */}
        <Component {...pageProps} />
        {/* </ThemeProvider> */}
      </Web3Provider>
    </MoralisProvider>
  );
};

export default App;
