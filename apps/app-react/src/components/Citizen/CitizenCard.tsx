import * as React from "react";
import { IpfsUriImageBackgroundRender } from "@turbo-eth/core-wagmi";
import { Address } from "@turbo-eth/core-wagmi";
import CitizenAlpha from "@web3-citizen/core-sol/deployments/localhost/CitizenAlpha.json";
import CitizenNotary from "@web3-citizen/core-sol/deployments/localhost/CitizenNotary.json";
import {
  NotaryIsFounder,
  NotaryIsNotary,
  useCitizenAlphaRead,
  useCitizenGetMetadata,
} from "@web3-citizen/core-wagmi";
import classNames from "classnames";
import Link from "next/link";

interface CitizenCardProps {
  className?: string;
  classNameImage?: string;
  walletAddress?: string;
  tokenId: string | number;
}

export const CitizenCard = ({
  className,
  classNameImage,
  tokenId = "0",
}: CitizenCardProps) => {
  const containerClassName = classNames(className, "CitizenCard");
  const { data: walletAddress } = useCitizenAlphaRead(
    CitizenAlpha.address,
    "ownerOf",
    [tokenId]
  );
  const metadata = useCitizenGetMetadata(
    CitizenAlpha.address,
    walletAddress || "",
    tokenId
  );

  return (
    <div className={containerClassName}>
      <IpfsUriImageBackgroundRender
        className={classNameImage}
        uri={metadata?.img || ""}
      />{" "}
      <h3 className="my-3 text-xl font-normal">
        {metadata?.description.length == 42 ? (
          <Address truncate address={metadata?.description} />
        ) : (
          metadata?.description
        )}
      </h3>
      <div className="block">
        <span className="block text-sm font-bold">{metadata?.name}</span>
        <span className="block text-sm font-normal">
          Invited By: <Address truncate address={metadata?.traits.link} />
        </span>
        <Link
          className="mt-2 inline-block text-sm"
          href={`/citizen/?address=${walletAddress}`}
        >
          View Account
        </Link>
      </div>
      <div className="">
        <NotaryIsFounder
          labelActive
          labelTrue="Yesss"
          labelFalse="No"
          contractAddress={CitizenNotary.address}
          userAddress={walletAddress || ""}
        />
        <NotaryIsNotary
          contractAddress={CitizenNotary.address}
          userAddress={walletAddress || ""}
        />
      </div>
    </div>
  );
};

export default CitizenCard;
