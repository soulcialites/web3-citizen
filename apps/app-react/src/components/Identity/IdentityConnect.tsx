import type { AlsoKnownAsAccount, BasicProfile } from "@self.id/framework";
import { usePublicRecord } from "@self.id/framework";
import { useViewerConnection } from "@self.id/react";
import { EthereumAuthProvider } from "@self.id/web";
import * as React from "react";

export function useProfile(id: string): BasicProfile | null | undefined {
  return usePublicRecord("basicProfile", id).content;
}

export function useSocialAccounts(id: string): Array<AlsoKnownAsAccount> {
  const accountsRecord = usePublicRecord("alsoKnownAs", id);
  return accountsRecord.content?.accounts ?? [];
}

interface IdentityConnectProps {
  className?: string;
}

async function createAuthProvider() {
  // The following assumes there is an injected `window.ethereum` provider
  const addresses = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  return new EthereumAuthProvider(window.ethereum, addresses[0]);
}

const Connected = ({ id }) => {
  const profile = useProfile(id);
  console.log(profile, "profile");
  return <div></div>;
};

export const IdentityConnect = ({ className }: IdentityConnectProps) => {
  const [connection, connect, disconnect] = useViewerConnection();

  return connection.status === "connected" ? (
    <button
      onClick={() => {
        disconnect();
      }}
    >
      <Connected id={connection.selfID.id} />
      Disconnect ({connection.selfID.id})
    </button>
  ) : "ethereum" in window ? (
    <button
      disabled={connection.status === "connecting"}
      onClick={() => {
        createAuthProvider().then(connect);
      }}
    >
      Connect
    </button>
  ) : (
    <p>
      An injected Ethereum provider such as{" "}
      <a href="https://metamask.io/">MetaMask</a> is needed to authenticate.
    </p>
  );
};

export default IdentityConnect;
