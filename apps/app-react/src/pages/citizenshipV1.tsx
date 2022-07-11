import { IpfsUriImageBackgroundRender } from "@turbo-eth/core-wagmi";
import CitizenAlpha from "@web3-citizen/core-sol/deployments/mainnet/CitizenAlpha.json";
import {
  useCitizenAlphaContractRead,
  useCitizenGetMetadata,
} from "@web3-citizen/core-wagmi";
import Link from "next/link";
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
  const citizenData = useCitizenGetMetadata(CitizenAlpha.address, citizenId);

  console.log(citizenData);

  return (
    <>
      <section
        style={{ minHeight: "70vh" }}
        className="dark: mx-autobg-gradient-to-br flex items-center justify-center from-neutral-100 via-neutral-100 to-neutral-200 py-12 text-neutral-500 shadow-sm dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-900 dark:text-white"
      >
        <div className="card container mx-auto grid max-w-lg grid-cols-12 gap-x-10 py-14">
          <div className="col-span-4 text-center">
            <div className="inline-block">
              <IpfsUriImageBackgroundRender
                className={
                  "full h-32 w-32 overflow-hidden rounded-full border-2 border-white shadow-lg"
                }
                classNameImage="rounded-full"
                uri={citizenData?.image || ""}
              />
            </div>
            <h3 className="text-md font-normal">{citizenData?.name}</h3>
          </div>
          <div className="col-span-8 flex flex-col justify-center">
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
              <div className="mt-4 flex items-center">
                <p className="">{citizenData?.traits?.description}</p>
              </div>
            </div>
          </div>
          <div className="col-span-5">
            {/* {
              // @ts-ignore
              citizenData?.attributes?.length > 0 && (
                <>
                  <Trait
                    label="description"
                    value={citizenData?.traits.description}
                  />
                  <Trait
                    label="twitter"
                    value={citizenData?.traits["com.twitter"]}
                  />
                  <Trait
                    label="github"
                    value={citizenData?.traits["com.github"]}
                  />
                  <hr
                    className="my-6 opacity-5"
                    style={{ marginTop: 6, marginBottom: 6, opacity: "0.35" }}
                  />
                </>
              )
            } */}
          </div>
        </div>
      </section>
    </>
  );
};
const IsInactiveCitizen = (props) => {
  return (
    <section className="dark: mx-auto bg-gradient-to-br from-neutral-100 via-neutral-100 to-neutral-200 py-12 text-neutral-500 shadow-sm dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-900 dark:text-white">
      <div className="container mx-auto max-w-screen-sm py-14"></div>
    </section>
  );
};

const Citizenship = () => {
  const account = useAccount();
  const { data: isCitizen } = useCitizenAlphaContractRead(
    CitizenAlpha.address,
    "isCitizen",
    [account.data?.address]
  );

  const { data: citizenId } = useCitizenAlphaContractRead(
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
      {!isCitizen && <IsInactiveCitizen />}
    </Main>
  );
};

export default Citizenship;
