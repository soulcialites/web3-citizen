import * as React from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { useNationWrite } from '../hooks/useNationWrite';
import { useLogError, useLogTransactionWrite } from '../hooks';
import { utils } from 'ethers';

interface NationFormRoleRevokeProps {
  className?: string;
  label: string;
  onUpdate?: Function;
  defaults?: any;
  contractAddress: string;
}

export const NationFormRoleRevoke = ({
  className,
  label,
  onUpdate,
  contractAddress,
}: NationFormRoleRevokeProps) => {
  const classes_ = classNames(className, 'NationFormRoleRevoke');

  const {
    register,
    handleSubmit,
    watch,
    formState: {},
  } = useForm({
    defaultValues: {
      citizen: '',
      role: '',
    },
  });
  const watchAllFields = watch();
  const { write, error, data } = useNationWrite(contractAddress, 'revokeRole', [
    utils.keccak256(utils.toUtf8Bytes(watchAllFields.role)),
    watchAllFields.citizen,
  ]);
  useLogError(error);
  useLogTransactionWrite(data);
  const onSubmit = (_data: any) => {
    write();
    if (onUpdate) onUpdate(_data);
  };

  return (
    <div className={classes_}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input"
          placeholder="Nation"
          {...register('role', { required: true })}
        />
        <input
          className="input mt-2"
          placeholder="web3oftrust.eth"
          {...register('citizen', { required: true })}
        />
        <button className="btn btn-default my-3 w-full" type="submit">
          {label}
        </button>
      </form>
    </div>
  );
};

NationFormRoleRevoke.defaultProps = {
  label: 'Revoke Role',
};

export default NationFormRoleRevoke;
