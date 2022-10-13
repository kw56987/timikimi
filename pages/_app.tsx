import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import * as T from '../utils'

function MyApp({ Component, pageProps }: AppProps) {
  const supportedChainIds = T.SUPPORTED_CHAIN_IDS;

  const connectors = {
    injected: {},
  };

  return (
    // @ts-ignore
    <ThirdwebWeb3Provider
      supportedChainIds={supportedChainIds}
      connectors={connectors}
    >
      <Component {...pageProps} />
    </ThirdwebWeb3Provider>
  );
}

export default MyApp
