import * as React from 'react';
import classNames from 'classnames';
import useCitizenAlphaContractRead from './useCitizenAlphaRead';
import CitizenCard from './CitizenCard';

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
  const classes = classNames(className, 'CitizenCardList');

  const { data, isError, isLoading } = useCitizenAlphaContractRead(
    contractAddress,
    'totalCitizens',
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
