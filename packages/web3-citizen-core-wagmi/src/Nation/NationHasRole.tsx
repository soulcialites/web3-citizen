import React from 'react';
import classNames from 'classnames';
import { useNationRead } from '../hooks/useNationRead';

interface NationHasRoleProps {
  className?: string;
  contractAddress?: string;
  userAddress?: string;
  role?: string;
}

export const NationHasRole = ({
  className,
  contractAddress,
  userAddress,
  role,
}: NationHasRoleProps) => {
  const containerClassName = classNames(className, 'NationHasRole');

  const { data, isError } = useNationRead(contractAddress || '', 'hasRole', [
    role,
    userAddress,
  ]);

  if (isError) return null;

  return <div className={containerClassName}>{data}</div>;
};

export default NationHasRole;
