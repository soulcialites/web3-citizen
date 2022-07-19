import React from 'react';
import classNames from 'classnames';
import { useNationRead } from '../hooks/useNationRead';
import { FOUNDER } from '../constants';

interface NationIsFounderProps {
  className?: string;
  classNameLabel?: string;
  label: string;
  labelActive: boolean;
  labelTrue: string;
  labelFalse: string;
  contractAddress?: string;
  userAddress?: string;
}

export const NationIsFounder = ({
  className,
  classNameLabel,
  contractAddress,
  userAddress,
  label,
  labelActive,
  labelTrue,
  labelFalse,
}: NationIsFounderProps) => {
  const classes_ = classNames(className, 'NationIsFounder');

  const { data, isError } = useNationRead(contractAddress || '', 'hasRole', [
    FOUNDER,
    userAddress,
  ]);

  if (isError) return null;

  return (
    <span className={classes_}>
      {labelActive && <span className={classNameLabel}>{label}</span>}{' '}
      {data ? labelTrue : labelFalse}
    </span>
  );
};

NationIsFounder.defaultProps = {
  labelActive: false,
  label: 'Founder: ',
  labelTrue: 'true',
  labelFalse: 'false',
};

export default NationIsFounder;
