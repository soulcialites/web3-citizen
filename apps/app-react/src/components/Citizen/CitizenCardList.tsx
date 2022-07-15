import * as React from "react";
import { useCitizenAlphaRead } from "@web3-citizen/core-wagmi";
import classNames from "classnames";

import CitizenCard from "./CitizenCard";

interface CitizenCardListProps {
  className?: string;
  classNameCard?: string;
  classNameCardImage?: string;
  account?: string;
  contractAddress: string;
}

export const CitizenCardList = ({
  className,
  classNameCard,
  classNameCardImage,
  contractAddress,
}: CitizenCardListProps) => {
  const classes = classNames(className, "CitizenCardList");

  const { data, isError, isLoading } = useCitizenAlphaRead(
    contractAddress,
    "totalCitizens",
    []
  );

  if (isError || isLoading) return null;
  return (
    <div className={classes}>
      {Array.from({ length: data.toNumber() }, (_v, i) => i).map((id) => (
        <CitizenCard
          key={id}
          tokenId={id}
          className={classNameCard}
          classNameImage={classNameCardImage}
          walletAddress=""
        />
      ))}
    </div>
  );
};

export default CitizenCardList;
