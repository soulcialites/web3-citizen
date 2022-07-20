import "../styles/global.css";
import "@rainbow-me/rainbowkit/styles.css";

import {
  RainbowKitProvider,
  connectorsForWallets,
  getDefaultWallets,
  wallet,
} from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { ModalProvider } from "react-modal-hook";
import { WagmiConfig, chain, configureChains, createClient } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

import IsMounted from "@/components/IsMounted";
import { AppConfig } from "@/utils/AppConfig";

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.mainnet,
    chain.hardhat,
    chain.goerli,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [chain.goerli, chain.kovan, chain.rinkeby, chain.ropsten]
      : []),
  ],
  [
    // jsonRpcProvider({
    //   priority: 0,
    //   rpc: () => ({
    //     http: "http://127.0.0.1:8545",
    //   }),
    // }),
    alchemyProvider({ alchemyId: "_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC" }),
    publicProvider(),
  ]
);

const { wallets } = getDefaultWallets({
  appName: AppConfig.title,
  chains,
});

const demoAppInfo = {
  appName: AppConfig.title,
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      wallet.argent({ chains }),
      wallet.trust({ chains }),
      wallet.ledger({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider appInfo={demoAppInfo} chains={chains}>
        <ModalProvider>
          <IsMounted>
            <Component {...pageProps} />
          </IsMounted>
        </ModalProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
