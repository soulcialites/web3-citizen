import React from 'react';
import classNames from 'classnames';
import { useCitizenNotaryRead } from '../useCitizenNotaryRead';

interface NotaryHasRoleProps {
  className?: string;
  contractAddress?: string;
  userAddress?: string;
  role?: string;
}

export const NotaryHasRole = ({ className, contractAddress, userAddress, role }: NotaryHasRoleProps) => {
  const containerClassName = classNames(className, 'NotaryHasRole');

  const { data, isError } = useCitizenNotaryRead(
    contractAddress || "",
    'hasRole',
    [role, userAddress],
  );

  if (isError) return null

  return <div className={containerClassName}>{data}</div>;
};

export default NotaryHasRole;
