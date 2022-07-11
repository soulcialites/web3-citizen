import * as React from 'react';
import classNames from 'classnames';
import CitizenAlpha from '@web3-citizen/core-sol/deployments/mainnet/CitizenAlpha.json';
import { IpfsUriImageBackgroundRender } from '@turbo-eth/core-wagmi';
import { Address } from '@turbo-eth/core-wagmi';
import useCitizenGetMetadata from './useCitizenGetMetadata';
import useCitizenAlphaContractRead from './useCitizenAlphaContractRead';

interface CitizenCardProps {
  className?: string;
  classNameImage?: string;
  walletAddress: string;
  tokenId: string | number;
}

export const CitizenCard = ({
  className,
  classNameImage,
  tokenId = '0',
}: CitizenCardProps) => {
  const containerClassName = classNames(className, 'CitizenCard');
  const { data: walletAddress } = useCitizenAlphaContractRead(
    CitizenAlpha.address,
    'ownerOf',
    [tokenId]
  );
  const metadata = useCitizenGetMetadata(
    CitizenAlpha.address,
    walletAddress || '',
    tokenId
  );

  return (
    <div className={containerClassName}>
      <IpfsUriImageBackgroundRender
        className={classNameImage}
        uri={metadata?.img || ''}
      />{' '}
      <h3 className="font-normal text-xl my-3">
        {metadata?.description.length == 42 ? (
          <Address truncate address={metadata?.description} />
        ) : (
          metadata?.description
        )}
      </h3>
      <div className="block">
        <span className="block font-bold text-sm">{metadata?.name}</span>
        <span className="block font-normal text-sm">
          Invited By: <Address truncate address={metadata?.traits['link']} />
        </span>
        <a className='inline-block mt-2 text-sm' href={`/citizen/?address=${walletAddress}`}>View Account</a>
      </div>
    </div>
  );
};

export default CitizenCard;
