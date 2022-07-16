import * as React from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { useCitizenNotaryWrite } from '../useCitizenNotaryWrite';
import { useLogError, useLogTransactionWrite } from '../hooks';
import { utils } from 'ethers';

interface NotaryFormDisableRoleProps {
  className?: string;
  label: string;
  onUpdate?: Function;
  defaults?: any;
  contractAddress: string;
}

export const NotaryFormDisableRole = ({
  className,
  label,
  onUpdate,
  contractAddress,
}: NotaryFormDisableRoleProps) => {
  const classes_ = classNames(className, 'NotaryFormDisableRole');

  const {
    register,
    handleSubmit,
    watch,
    formState: {},
  } = useForm({
    defaultValues: {
      role: '',
    },
  });
  const watchAllFields = watch();
  const { write, error, data } = useCitizenNotaryWrite(
    contractAddress,
    'disableRole',
    [utils.keccak256(utils.toUtf8Bytes(watchAllFields.role))]
  );
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
          placeholder="LABS"
          {...register('role', { required: true })}
        />
        <button
          className="btn btn-default my-3 w-full"
          type="submit"
        >
          {label}
        </button>
      </form>
    </div>
  );
};

NotaryFormDisableRole.defaultProps = {
  label: 'Disable Role',
};

export default NotaryFormDisableRole;
