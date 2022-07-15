import React from 'react';
import classNames from 'classnames';
import { useCitizenNotaryRead } from '../useCitizenNotaryRead';
import { NOTARY } from '../constants';

interface NotaryIsNotaryProps {
  className?: string;
  labelTrue: string;
  labelFalse: string;
  contractAddress?: string;
  userAddress?: string;
}


export const NotaryIsNotary = ({ className, contractAddress, userAddress, labelTrue, labelFalse }: NotaryIsNotaryProps) => {
    const containerClassName = classNames(className, 'NotaryHasRole');

  const { data, isError } = useCitizenNotaryRead(
    contractAddress || "",
    'hasRole',
    [NOTARY, userAddress],
  );

  if (isError) return null

  return <div className={containerClassName}>Notary: {data ? labelTrue : labelFalse}</div>;
};

NotaryIsNotary.defaultProps = {
    labelTrue: "Yes",
    labelFalse: "No",
}

export default NotaryIsNotary;
