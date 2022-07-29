import { EthereumAuthProvider, ThreeIdConnect } from "@3id/connect";
import { getResolver as get3IDResolver } from "@ceramicnetwork/3id-did-resolver";
import { CeramicClient } from "@ceramicnetwork/http-client";
import classNames from "classnames";
import { DID } from "dids";
import * as React from "react";
import { useAccount, useSigner } from "wagmi";

interface IdentityConnectProps {
  className?: string;
}

const CERAMIC_URL = "";
async function createAuthProvider() {
  // The following assumes there is an injected `window.ethereum` provider
  const addresses = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  return new EthereumAuthProvider(window.ethereum, addresses[0]);
}

export const IdentityConnect = ({ className }: IdentityConnectProps) => {
  const containerClassName = classNames(className, "IdentityConnect");
  const account = useAccount();
  // const provider = useProvider();
  const signer = useSigner();

  const [authProvider, setAuthProvider] = React.useState<any>();
  React.useEffect(() => {
    console.log(signer.data?.provider?.provider);
    if (signer.data?.provider && account.data?.address) {
      // ethProvider is an Ethereum provider and addresses an array of strings
      const ethAuthProvider = new EthereumAuthProvider(
        signer.data?.provider?.provider,
        account.data?.address
      );
      setAuthProvider(ethAuthProvider);
    }
  }, [signer.data?.provider]);

  const handleOnClick = async () => {
    if (authProvider) {
      const threeIdConnect = new ThreeIdConnect("local");
      console.log(authProvider);
      console.log(threeIdConnect);
      await threeIdConnect.connect(authProvider);
      const ceramic = new CeramicClient(CERAMIC_URL);
      const did = new DID({
        provider: threeIdConnect.getDidProvider(),
        resolver: get3IDResolver(ceramic),
      });

      await did.authenticate();
      console.log(did.id);

      const jws = await did.createJWS({ hello: "world" });
      console.log(jws);

      window.ceramic = ceramic;
      window.did = did.id;
    }
  };

  return (
    <div onClick={handleOnClick} className={containerClassName}>
      Connect
    </div>
  );
};

export default IdentityConnect;
