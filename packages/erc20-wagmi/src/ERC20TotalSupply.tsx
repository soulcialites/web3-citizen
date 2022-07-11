import * as React from 'react';

import classNames from 'classnames';
import { utils } from 'ethers';
import useERC20ContractRead from './useERC20ContractRead';

interface ERC20TotalSupplyProps {
  className?: string;
  account?: string;
  contractAddress: string;
}

export const ERC20TotalSupply = ({
  className,
  contractAddress,
}: ERC20TotalSupplyProps) => {
  const classes = classNames(className, 'ERC20TotalSupply');
  const { data, isError, isLoading } = useERC20ContractRead(
    contractAddress,
    'totalSupply',
    []
  );
  if (isError || isLoading) return null;
  return <div className={classes}>{utils.formatEther(data || '0')}</div>;
};

export default ERC20TotalSupply;
