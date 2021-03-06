import * as React from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { useNationWrite } from '../hooks/useNationWrite';
import { useLogError, useLogTransactionWrite } from '../hooks';
import { utils } from 'ethers';

interface NationFormEnableRoleProps {
  className?: string;
  label: string;
  onUpdate?: Function;
  defaults?: any;
  contractAddress: string;
}

export const NationFormEnableRole = ({
  className,
  label,
  onUpdate,
  contractAddress,
}: NationFormEnableRoleProps) => {
  const classes_ = classNames(className, 'NationFormEnableRole');

  const {
    register,
    handleSubmit,
    watch,
    formState: {},
  } = useForm({
    defaultValues: {
      role: '',
      adminRole: '',
    },
  });
  const watchAllFields = watch();
  const { write, error, data } = useNationWrite(contractAddress, 'enableRole', [
    utils.keccak256(utils.toUtf8Bytes(watchAllFields.role)),
    utils.keccak256(utils.toUtf8Bytes(watchAllFields.adminRole)),
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
        <label className="label my-2 block">Role</label>
        <input
          className="input"
          placeholder="TREASURY"
          {...register('role', { required: true })}
        />
        <label className="label my-2 block">Admin Role</label>
        <input
          className="input"
          placeholder="FOUNDER"
          {...register('adminRole', { required: true })}
        />
        <button className="btn btn-default my-3 w-full" type="submit">
          {label}
        </button>
      </form>
    </div>
  );
};

NationFormEnableRole.defaultProps = {
  label: 'Enable Role',
};

export default NationFormEnableRole;
