import { Address, IpfsUriImageBackgroundRender } from "@turbo-eth/core-wagmi";
import CitizenAlpha from "@web3-citizen/core-sol/deployments/localhost/CitizenAlpha.json";
import {
  useCitizenAlphaRead,
  useCitizenGetMetadata,
} from "@web3-citizen/core-wagmi";
import { useRouter } from "next/router";

import { Main } from "@/templates/Main";
import { Meta } from "@/templates/Meta";
import { AppConfig } from "@/utils/AppConfig";

const IsActiveCitizen = ({ citizenId, citizenAddress }: any) => {
  const citizenData = useCitizenGetMetadata(
    CitizenAlpha.address,
    citizenAddress,
    citizenId
  );

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
                uri={citizenData?.img || ""}
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
      <div className="container mx-auto max-w-screen-sm py-14 text-center">
        <div className="card text-center">
          {citizenAddress} is not a Web3 Citizen
        </div>
      </div>
    </section>
  );
};

const Citizenship = () => {
  const { query } = useRouter();

  const { data: isCitizen } = useCitizenAlphaRead(
    CitizenAlpha.address,
    "isCitizen",
    [query.address]
  );

  const { data: citizenId } = useCitizenAlphaRead(
    CitizenAlpha.address,
    "getId",
    [query.address]
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
          citizenAddress={query?.address}
        />
      )}
      {!isCitizen && <IsInactiveCitizen citizenAddress={query?.address} />}
    </Main>
  );
};

export default Citizenship;
