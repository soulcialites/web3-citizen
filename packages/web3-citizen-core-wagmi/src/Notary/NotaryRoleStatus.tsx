import React from 'react';
import classNames from 'classnames';
import { useCitizenNotaryRead } from '../useCitizenNotaryRead';
import { utils } from 'ethers';

interface NotaryRoleStatusProps {
  className?: string;
  classNameLabel?: string;
  roleActive?: boolean;
  label: string;
  labelActive: boolean;
  labelTrue: string;
  labelFalse: string;
  contractAddress?: string;
  role?: string;
}

export const NotaryRoleStatus = ({
  className,
  contractAddress,
  role,
  classNameLabel,
  roleActive,
  label,
  labelActive,
  labelTrue,
  labelFalse,
}: NotaryRoleStatusProps) => {
  const classes_ = classNames(className, 'NotaryRoleStatus');

  const { data, isError } = useCitizenNotaryRead(
    contractAddress || '',
    'roleStatus',
    [utils.keccak256(utils.toUtf8Bytes(role || ''))]
  );

  if (isError) return null;

  return (
    <span className={classes_}>
      <span className="">
        {roleActive && <span className="">role</span>}{' '}
        {labelActive && <span className={classNameLabel}>{label}</span>}{' '}
      </span>
      {data ? labelTrue : labelFalse}
    </span>
  );
};

NotaryRoleStatus.defaultProps = {
  labelActive: false,
  label: 'Status: ',
  labelTrue: 'Enabled',
  labelFalse: 'Disabled',
};

export default NotaryRoleStatus;
