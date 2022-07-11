import { IpfsUriImageBackgroundRender } from "@turbo-eth/core-wagmi";
import CitizenAlpha from "@web3-citizen/core-sol/deployments/mainnet/CitizenAlpha.json";
import {
  useCitizenAlphaContractRead,
  useCitizenGetMetadata,
} from "@web3-citizen/core-wagmi";
import Link from "next/link";
import { useRouter } from "next/router";
import { GitHub, Twitter } from "react-feather";
import { useAccount } from "wagmi";

import ModalCitizenshipIssue from "@/components/ModalCitizenshipIssue";
import { ModalEditCitizenProfile } from "@/components/ModalEditCitizenProfile";
import { Main } from "@/templates/Main";
import { Meta } from "@/templates/Meta";
import { AppConfig } from "@/utils/AppConfig";

const Trait = ({ value, label }: any) => {
  if (!value) return null;
  return (
    <div>
      {label}: {value}
    </div>
  );
};

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
        <div className="card container mx-auto grid max-w-md grid-cols-12 gap-y-4 py-14">
          <div className="col-span-12 text-left">
            <IpfsUriImageBackgroundRender
              className={
                "h-96 w-full overflow-hidden rounded-lg border-2 border-white shadow-lg"
              }
              uri={citizenData?.img || ""}
            />
          </div>
          <div className="col-span-12">
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
              {/* <div className="mt-4 flex items-center">
                <p className="">{citizenData?.traits?.description}</p>
              </div> */}
              <hr className="my-4 opacity-40" />
              <h3 className="mt-2 text-center text-sm font-normal">
                {citizenData?.name}
              </h3>
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
  const { data: isCitizen } = useCitizenAlphaContractRead(
    CitizenAlpha.address,
    "isCitizen",
    [query.address]
  );

  const { data: citizenId } = useCitizenAlphaContractRead(
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
