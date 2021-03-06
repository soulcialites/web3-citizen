import { IpfsUriImageBackgroundRender } from "@turbo-eth/core-wagmi";
import { Address } from "@turbo-eth/core-wagmi";
import CitizenAlpha from "@web3-citizen/core-sol/deployments/mainnet/CitizenAlpha.json";
import Notary from "@web3-citizen/core-sol/deployments/mainnet/Notary.json";
import {
  NotaryIsFounder,
  NotaryIsNotary,
  useCitizenAlphaRead,
  useCitizenGetMetadata,
} from "@web3-citizen/core-wagmi";
import classNames from "classnames";
import Link from "next/link";
import * as React from "react";

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
      <hr className="my-3" />
      <div className="flex items-center justify-between">
        <span className="block text-sm font-bold">{metadata?.name}</span>
        <Link href={`/citizen/?address=${walletAddress}`}>
          <span className="cursor-pointer text-xs font-bold">View Account</span>
        </Link>
      </div>
    </div>
  );
};

export default CitizenCard;
