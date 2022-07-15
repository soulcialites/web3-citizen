import * as React from 'react';
import classNames from 'classnames';
import useCitizenAlphaContractRead from './useCitizenAlphaRead';
import { Address } from '@turbo-eth/core-wagmi';
interface CitizenLinkProps {
  className?: string;
  contractAddress: string;
  address?: string;
}

export const CitizenLink = ({
  className,
  contractAddress,
  address,
}: CitizenLinkProps) => {
  const classes = classNames(className, 'CitizenLink');
  const { data, isError, isLoading } = useCitizenAlphaContractRead(
    contractAddress,
    'getLink',
    [address]
  );
  if (isError || isLoading) return null;
  return <Address className={classes} address={data} truncate />;
};

export default CitizenLink;
