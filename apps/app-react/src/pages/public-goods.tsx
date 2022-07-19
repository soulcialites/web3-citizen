import { ERC20TotalSupply } from "@turbo-eth/erc20-wagmi";
import TrustToken from "@web3-citizen/core-sol/deployments/localhost/TrustToken.json";
import { TrustTokenClaim } from "@web3-citizen/core-wagmi";

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
        <div className="container mx-auto grid max-w-screen-md grid-cols-12">
          <div className="col-span-6">
            <h3 className="text-lg font-normal">PGP.alpha</h3>
            <h1 className="m-0 mb-0 text-3xl font-bold">
              Public Goods Protocol
            </h1>
          </div>
          <div className="col-span-6 flex items-center justify-end">
            <div className="text-right">
              <span className="text-xs font-semibold">total supply</span>
              <ERC20TotalSupply
                contractAddress={TrustToken.address}
                className="text-3xl"
              />
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className="container mx-auto max-w-screen-md py-10">
          <h3 className="text-3xl font-normal">Claim Tokens</h3>
          <p className="text-lg">Citizens can claim 10,000 PGP.alpha tokens.</p>
          <p className="">
            <span className="font-bold">Tokens have ZERO financial value.</span>{" "}
            <span className="italic">None.</span>
          </p>
          <p className="">
            And will only be used for Web3 of Trust coordination experiments.
          </p>
          <TrustTokenClaim
            contractAddress={TrustToken.address}
            className="btn btn-blue mt-4 inline-block cursor-pointer"
          />
          <p className="text-xs">
            Notice: Refresh the page after claiming to see updated total supply.
          </p>
          <h3 className="mt-8 text-xl font-bold">Technology</h3>
          <p className="">
            TrustToken uses a TWAB library (credit PoolTogether) for balance
            lookups across epoch ranges.
          </p>
          <p className="">
            Time-weighted average balances are interesting primitive to
            experiment with cross-chain coordination.
          </p>
          <hr className="my-5" />
          <h5 className="text-xl">Useful Resources</h5>
          <ul className="my-3 list-disc pl-8 text-sm">
            <li>
              <a
                target={"_blank"}
                href="https://en.wikipedia.org/wiki/Web_of_trust"
                rel="noreferrer"
              >
                Web of Trust
              </a>
            </li>
            <li>
              <a
                target={"_blank"}
                href="https://en.wikipedia.org/wiki/Pretty_Good_Privacy"
                rel="noreferrer"
              >
                PGP (Pretty Good Privacy)
              </a>
            </li>
          </ul>
        </div>
      </section>
    </Main>
  );
};

export default Index;
