import "../styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi'
 
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
 
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { getHuddleClient,HuddleClientProvider } from '@huddle01/huddle01-client';
 
// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: 'yourAlchemyApiKey' }), publicProvider()],
)
 
// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})
 
function MyApp({ Component, pageProps }: AppProps) {
  const huddleClient = getHuddleClient('26fa4b9e22bffff7bdb6e64f4456eb1a5358f25f0c210bb4cb85f0f6d887d9ec');

  return        <HuddleClientProvider client = {huddleClient} >
  <WagmiConfig client={client}>
  <Component {...pageProps} /></WagmiConfig></HuddleClientProvider>;
}

export default MyApp;
