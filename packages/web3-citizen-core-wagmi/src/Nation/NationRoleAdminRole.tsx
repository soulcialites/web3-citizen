import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useNationRead } from '../hooks/useNationRead';
import { utils } from 'ethers';
import { useLogError } from '../hooks';
import { reverseLookup } from '../constants';

interface NationRoleAdminRoleProps {
  className?: string;
  classNameLabel?: string;
  label: string;
  labelActive: boolean;
  contractAddress?: string;
  role: string;
}

export const NationRoleAdminRole = ({
  className,
  contractAddress,
  role,
  classNameLabel,
  label,
  labelActive,
}: NationRoleAdminRoleProps) => {
  const classes_ = classNames(className, 'NationRoleAdminRole');

  const { data, isError, error } = useNationRead(
    contractAddress || '',
    'getRoleAdmin',
    [utils.keccak256(utils.toUtf8Bytes(role))]
  );
  useLogError(error);
  const [roleReverseLookup, setRoleReverseLookup] = useState<string>('');
  useEffect(() => {
    // @ts-ignore
    setRoleReverseLookup(reverseLookup[data || '']);
  }, [data]);
  if (isError) return null;

  return (
    <span className={classes_}>
      <span className="">
        {labelActive && <span className={classNameLabel}>{label}</span>}
        <span className="">{roleReverseLookup}</span>
      </span>
    </span>
  );
};

NationRoleAdminRole.defaultProps = {
  labelActive: false,
  label: 'AdminRole: ',
};

export default NationRoleAdminRole;
