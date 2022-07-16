import React from 'react';
import classNames from 'classnames';
import { useCitizenNotaryRead } from '../useCitizenNotaryRead';
import { FOUNDER } from '../constants';

interface NotaryIsFounderProps {
  className?: string;
  classNameLabel?: string;
  label: string;
  labelActive: boolean;
  labelTrue: string;
  labelFalse: string;
  contractAddress?: string;
  userAddress?: string;
}

export const NotaryIsFounder = ({
  className,
  classNameLabel,
  contractAddress,
  userAddress,
  label,
  labelActive,
  labelTrue,
  labelFalse,
}: NotaryIsFounderProps) => {
  const classes_ = classNames(className, 'NotaryIsFounder');

  const { data, isError } = useCitizenNotaryRead(
    contractAddress || '',
    'hasRole',
    [FOUNDER, userAddress]
  );

  if (isError) return null;

  return (
    <span className={classes_}>
      {labelActive && <span className={classNameLabel}>{label}</span>}{' '}
      {data ? labelTrue : labelFalse}
    </span>
  );
};

NotaryIsFounder.defaultProps = {
  labelActive: false,
  label: 'Founder: ',
  labelTrue: 'true',
  labelFalse: 'false',
};

export default NotaryIsFounder;
