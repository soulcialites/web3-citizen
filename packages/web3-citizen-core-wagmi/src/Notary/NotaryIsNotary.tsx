import React from 'react';
import classNames from 'classnames';
import { useNotaryRead } from '../hooks/useNotaryRead';
import { NOTARY } from '../constants';

interface NotaryIsNotaryProps {
  className?: string;
  labelTrue: string;
  labelFalse: string;
  contractAddress?: string;
  userAddress?: string;
}

export const NotaryIsNotary = ({
  className,
  contractAddress,
  userAddress,
  labelTrue,
  labelFalse,
}: NotaryIsNotaryProps) => {
  const containerClassName = classNames(className, 'NotaryHasRole');

  const { data, isError } = useNotaryRead(contractAddress || '', 'hasRole', [
    NOTARY,
    userAddress,
  ]);

  if (isError) return null;

  return (
    <div className={containerClassName}>
      Notary: {data ? labelTrue : labelFalse}
    </div>
  );
};

NotaryIsNotary.defaultProps = {
  labelTrue: 'Yes',
  labelFalse: 'No',
};

export default NotaryIsNotary;
