import * as React from 'react';
import classNames from 'classnames';
import useTrustTokenContractWrite from './useTrustTokenWrite';

interface TrustTokenClaimProps {
  className?: string;
  contractAddress: string;
  address?: string;
}

export const TrustTokenClaim = ({
  className,
  contractAddress,
}: TrustTokenClaimProps) => {
  const classes = classNames(className, 'TrustTokenClaim');
  const { write } = useTrustTokenContractWrite(contractAddress, 'claim', []);
  return (
    <span onClick={write} className={classes}>
      Claim PGP.alpha
    </span>
  );
};

export default TrustTokenClaim;
