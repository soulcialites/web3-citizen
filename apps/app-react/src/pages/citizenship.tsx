import { Address, IpfsUriImageBackgroundRender } from "@turbo-eth/core-wagmi";
import CitizenAlpha from "@web3-citizen/core-sol/deployments/localhost/CitizenAlpha.json";
import Nation from "@web3-citizen/core-sol/deployments/localhost/Nation.json";
import Notary from "@web3-citizen/core-sol/deployments/localhost/Notary.json";
import NotaryServiceDelegatable from "@web3-citizen/core-sol/deployments/localhost/NotaryServiceDelegatable.json";
import {
  NationIsFounder,
  NotaryIsNotary,
  NotaryServiceDelegatableFormClaimInvocation,
  useCitizenAlphaRead,
  useCitizenGetMetadata,
} from "@web3-citizen/core-wagmi";
import { useAccount } from "wagmi";

import NotaryServiceDelegatableClaimFromInviteList from "@/components/Claim/NotaryServiceDelegatableFormClaimInvocation";
import { Main } from "@/templates/Main";
import { Meta } from "@/templates/Meta";
import { AppConfig } from "@/utils/AppConfig";

const IsActiveCitizen = ({ citizenId, citizenAddress }: any) => {
  const citizenData = useCitizenGetMetadata(
    CitizenAlpha.address,
    citizenAddress,
    citizenId
  );

  if (!citizenData) return null;

  return (
    <>
      <section
        style={{ minHeight: "70vh" }}
        className="dark: mx-autobg-gradient-to-br flex items-center justify-center from-neutral-100 via-neutral-100 to-neutral-200 py-12 text-neutral-500 shadow-sm dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-900 dark:text-white"
      >
        <div className="card container mx-auto grid max-w-4xl grid-cols-12 gap-x-10 py-14">
          <div className="col-span-6 -my-10 -ml-8 text-left">
            <div className="h-96 w-full text-center">
              <IpfsUriImageBackgroundRender
                className={
                  "h-96 w-full overflow-hidden rounded-2xl border-4 border-white border-opacity-30 shadow-lg hover:shadow-xl"
                }
                uri={citizenData.img || ""}
              />
              <p className="text-xs">
                Use the{" "}
                <a
                  target={"_blank"}
                  href="https://app.ens.domains/"
                  rel="noreferrer"
                >
                  {" "}
                  Ethereum Name System app{" "}
                </a>{" "}
                to set text fields.
              </p>
            </div>
          </div>
          <div className="col-span-6 flex flex-col justify-center">
            <div className="">
              <h5 className="text-3xl font-light">
                {citizenData?.description}
              </h5>
              <ul className="my-0 flex text-xs">
                <li>
                  <a
                    target="_blank"
                    href={`https://etherscan.io/address/${citizenAddress}`}
                    rel="noreferrer"
                  >
                    Etherscan
                  </a>{" "}
                </li>
                {citizenData?.traits["com.twitter"] && (
                  <li className="pl-2">
                    <a
                      target="_blank"
                      href={`https://twitter.com/${citizenData?.traits["com.twitter"]}`}
                      rel="noreferrer"
                    >
                      Twitter
                    </a>
                  </li>
                )}
                {citizenData?.traits["com.github"] && (
                  <li className="pl-2">
                    <a
                      target="_blank"
                      href={`https://github.com/${citizenData?.traits["com.github"]}`}
                      rel="noreferrer"
                    >
                      Github
                    </a>
                  </li>
                )}
              </ul>
              <div className="mt-4">
                <p className="">{citizenData?.traits?.description}</p>
                <p className="text-xs">
                  link: <Address truncate address={citizenData?.traits?.link} />
                </p>
                <p className="text-xs">{citizenData?.traits?.did}</p>
              </div>
              <div className="">
                <NationIsFounder
                  className="text-sm"
                  labelActive
                  labelTrue="Yes"
                  labelFalse="No"
                  contractAddress={Nation.address}
                  userAddress={citizenAddress || ""}
                />
                <NotaryIsNotary
                  className="text-sm"
                  contractAddress={Notary.address}
                  userAddress={citizenAddress || ""}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
const IsInactiveCitizen = ({ citizenAddress }: any) => {
  return (
    <section
      style={{ minHeight: "70vh" }}
      className="dark: mx-autobg-gradient-to-br flex items-center justify-center from-neutral-100 via-neutral-100 to-neutral-200 py-12 text-neutral-500 shadow-sm dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-900 dark:text-white"
    >
      <div className="container mx-auto max-w-screen-sm py-14">
        <div className="card">
          <h3 className="text-5xl font-bold">Welcome</h3>
          <div className="text-sm">{citizenAddress}</div>
          <p className="text-sm">
            You are not a Web3 Citizen:{" "}
            <span className="font-bold">here is how to get started 👇</span>
          </p>
          <hr className="my-3" />
          <p className="">
            Web3 Citizen is an experiment to grow the{" "}
            <span className="font-bold">Web3 of Trust.</span>
          </p>
          <div className="my-4 rounded-md bg-slate-800 p-6 text-center">
            <NotaryServiceDelegatableFormClaimInvocation
              contractAddress={NotaryServiceDelegatable.address}
            />
          </div>
          <h3 className="text-2xl font-semibold">Citizenship</h3>
          <p className="font-semibold leading-4">
            A Web3 Citizenship is a unique collectable: ownable only by{" "}
            <span className="font-bold italic">You</span>.
          </p>
          <p className="text-sm">The token features include:</p>
          <ul className="my-3 list-disc pl-8 text-sm">
            <li>Soulbound: non-transferable token</li>
            <li>
              Ethereum Name System: address, name and text record resolution
            </li>
            <li>ERC721 Metadata: dynamic trait generation</li>
            <li>Generative Image: ENS Avatar or Custom SVG</li>
            <li>Dynamic AccessControls: on-chain authentication via roles</li>
          </ul>
          <p className="text-sm">
            To obtain Citizenship you need to befriend a Notary.
          </p>
        </div>
      </div>
    </section>
  );
};

const Citizenship = () => {
  const account = useAccount();
  const { data: isCitizen } = useCitizenAlphaRead(
    CitizenAlpha.address,
    "isCitizen",
    [account.data?.address]
  );

  const { data: citizenId } = useCitizenAlphaRead(
    CitizenAlpha.address,
    "getId",
    [account.data?.address]
  );

  return (
    <Main
      meta={
        <Meta
          title={`${AppConfig.title} | ${AppConfig.description}`}
          description={AppConfig.description}
        />
      }
    >
      {isCitizen && (
        <IsActiveCitizen
          citizenId={citizenId}
          citizenAddress={account?.data?.address}
        />
      )}
      {!isCitizen && (
        <IsInactiveCitizen citizenAddress={account?.data?.address} />
      )}
    </Main>
  );
};

export default Citizenship;
