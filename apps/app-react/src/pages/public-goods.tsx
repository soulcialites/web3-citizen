import { ERC20TotalSupply } from "@turbo-eth/erc20-wagmi";
import CitizenAlpha from "@web3-citizen/core-sol/deployments/mainnet/CitizenAlpha.json";
import TrustToken from "@web3-citizen/core-sol/deployments/mainnet/TrustToken.json";
import {
  CitizenCardList,
  NFTCard,
  TrustTokenClaim,
} from "@web3-citizen/core-wagmi";

import ModalCitizenshipIssue from "@/components/ModalCitizenshipIssue";
import ModalCitizenshipRevoke from "@/components/ModalCitizenshipRevoke";
import { ModalEditCitizenProfile } from "@/components/ModalEditCitizenProfile";
import ModalFounderAdd from "@/components/ModalFounderAdd";
import ModalFounderRemove from "@/components/ModalFounderRemove";
import { Main } from "@/templates/Main";
import { Meta } from "@/templates/Meta";
import { AppConfig } from "@/utils/AppConfig";

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title={`${AppConfig.title} | ${AppConfig.description}`}
          description={AppConfig.description}
        />
      }
    >
      <div className="dark: mx-auto bg-gradient-to-br from-neutral-100 via-neutral-100 to-neutral-200 py-12 text-neutral-500 shadow-sm dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-900 dark:text-white">
        <div className="container mx-auto grid max-w-screen-lg grid-cols-12">
          <div className="col-span-6">
            <h1 className="m-0 mb-0 text-3xl font-bold">
              Public Goods Protocol (PGP.alpha)
            </h1>
          </div>
          <div className="col-span-6 flex items-center justify-center">
            <div className="text-right">
              <ERC20TotalSupply
                contractAddress={TrustToken.address}
                className="text-3xl"
              />
              <span className="text-xs font-semibold">total supply</span>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className="container mx-auto max-w-screen-lg py-10">
          <h3 className="text-3xl font-normal">Claim Tokens</h3>
          <p className="text-lg">Citizens can claim 1,000 PGP.alpha tokens.</p>
          <p className="">
            <span className="font-bold">
              The tokens have ZERO financial value.
            </span>{" "}
            And will only be used for coordination experiments.
          </p>
          <TrustTokenClaim
            contractAddress={TrustToken.address}
            className="btn btn-blue mt-4 inline-block cursor-pointer"
          />
          <p className="text-xs">
            Notice: Refresh the page after claiming to see updated total supply.
          </p>
        </div>
      </section>
    </Main>
  );
};

export default Index;
