import React from 'react';
import classNames from 'classnames';
import { useNationRead } from '../hooks/useNationRead';
import { utils } from 'ethers';

interface NationRoleStatusProps {
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

export const NationRoleStatus = ({
  className,
  contractAddress,
  role,
  classNameLabel,
  roleActive,
  label,
  labelActive,
  labelTrue,
  labelFalse,
}: NationRoleStatusProps) => {
  const classes_ = classNames(className, 'NationRoleStatus');

  const { data, isError } = useNationRead(contractAddress || '', 'roleStatus', [
    utils.keccak256(utils.toUtf8Bytes(role || '')),
  ]);

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

NationRoleStatus.defaultProps = {
  labelActive: false,
  label: 'Status: ',
  labelTrue: 'Enabled',
  labelFalse: 'Disabled',
};

export default NationRoleStatus;
