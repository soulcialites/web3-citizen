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
        <div className="container mx-auto grid max-w-screen-sm grid-cols-12">
          <div className="col-span-6">
            <h1 className="m-0 mb-0 text-3xl font-bold">Experiments</h1>
          </div>
          <div className="col-span-6 flex items-center justify-end">
            <h3 className=" text-sm font-normal">Asking "What's possible?"</h3>
          </div>
        </div>
      </div>
      <section>
        <div className="container mx-auto max-w-screen-sm py-10">
          <h3 className=" text-4xl font-semibold">Web3 Citizen</h3>
          <h5 className="leading-2 text-xl font-light">A Network of Humans</h5>
          <p className="text-sm">
            <span className="font-bold">Thesis:</span> <br />
            Localized trust networks will lead to the proliferation of healthy
            DAOs.
          </p>
          <p className="text-sm">
            <span className="font-bold">Hypothesis:</span> <br />
          </p>
          <p className="text-sm">
            <span className="font-bold">
              Trust is contextual. And complicated.
            </span>{" "}
          </p>
          <p className="text-sm">
            Also it's important to distinguish between on-chain and off-chain
            trust.
          </p>
          <p className="text-sm">
            Decentralized Identifiers (off-chain trust) and Soulbound tokens
            (on-chain permissions) when combined offer a unique way to approach
            Web3 Decentralized Identity.
          </p>
          <p className="text-sm">
            <span className="font-bold">Experiment:</span>
            <br /> The Web3 Citizen smart contract uses:
          </p>
          <ul className="my-3 list-disc pl-8 text-sm">
            <li>Soulbound (Non-Transferable Token)</li>
            <li>ERC721 Metadata Standard</li>
            <li>Dynamic Trait Generator</li>
            <li>Image Resolver + SVGBuilder</li>
            <li>Flexible Issuance + Revocation</li>
            <li>AccessControl (Founder, Notary, Executive, etc...)</li>
          </ul>
          <p className="text-sm">
            The combination of features creates a unique "petri dish" for
            experimentation.
          </p>
          <p className="text-sm">
            Specifically experimenting with{" "}
            <span className="font-bold">Soulbound Items</span> with{" "}
            <span className="font-bold">Decentralized Identifier</span>:
          </p>
          <ul className="my-3 list-disc pl-8 text-sm">
            <li>On-Chain Permissions</li>
            <li>Off-Chain Data &amp; Metadata</li>
          </ul>
          <p className="text-sm">
            Built atop the <a>Ethereum Name System</a> protocol, an existing
            Ethereum protocol, the Web3 Citizen experiment uses ENS smart
            contract API (a public good) for value capture.
          </p>
          <p className="text-sm">
            Encouraging Citizens to use ENS to build a Web3 of Trust: combining
            on-chain permissions and off-chain identifiers.
          </p>
          <h3 className=" text-4xl font-semibold">Upcoming Experiments</h3>
          <ul className="my-3 list-disc pl-8 text-sm">
            <li>
              <span className="font-bold">RepresentativeDemocracy:</span>{" "}
              Cross-Chain Governance
            </li>
          </ul>
        </div>
      </section>
    </Main>
  );
};

export default Index;
