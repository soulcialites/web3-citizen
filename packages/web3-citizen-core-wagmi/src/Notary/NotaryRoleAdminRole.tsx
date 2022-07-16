import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useCitizenNotaryRead } from '../useCitizenNotaryRead';
import { utils } from 'ethers';
import { useLogError } from '../hooks';
import { reverseLookup } from '../constants';

interface NotaryRoleAdminRoleProps {
  className?: string;
  classNameLabel?: string;
  label: string;
  labelActive: boolean;
  contractAddress?: string;
  role: string;
}

export const NotaryRoleAdminRole = ({
  className,
  contractAddress,
  role,
  classNameLabel,
  label,
  labelActive,
}: NotaryRoleAdminRoleProps) => {
  const classes_ = classNames(className, 'NotaryRoleAdminRole');

  const { data, isError, error } = useCitizenNotaryRead(
    contractAddress || '',
    'getRoleAdmin',
    [utils.keccak256(utils.toUtf8Bytes(role))]
  );
  useLogError(error);
  const [roleReverseLookup, setRoleReverseLookup] = useState<string>('');
  console.log(reverseLookup, 'roleReverseLookup')
  useEffect(() => {
    console.log(data, 'datadata');
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

NotaryRoleAdminRole.defaultProps = {
  labelActive: false,
  label: 'AdminRole: ',
};

export default NotaryRoleAdminRole;
