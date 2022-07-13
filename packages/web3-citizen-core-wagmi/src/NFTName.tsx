// @ts-nocheck
import * as React from 'react';
import { useContractRead } from 'wagmi';
import classNames from 'classnames';
import CitizenAlpha from '@web3-citizen/core-sol/deployments/localhost/CitizenAlpha.json';

interface NFTNameProps {
  className?: string;
  tokenId: string | number;
}

export const NFTName = ({ className, tokenId = '0' }: NFTNameProps) => {
  const containerClassName = classNames(className, 'NFTName');

  const { data, isError, isLoading, error, ...rest } = useContractRead(
    {
      addressOrName: '0xe1708FA6bb2844D5384613ef0846F9Bc1e8eC55E',
      contractInterface: CitizenAlpha.abi,
    },
    'name',
    {
      args: [],
    }
  );

  if (isError) {
    return <div>Error requesting NFT data</div>;
  }

  return <div className={containerClassName}>{data}</div>;
};

export default NFTName;
