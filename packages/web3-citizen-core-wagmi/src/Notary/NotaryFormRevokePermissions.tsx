import * as React from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { useNationWrite } from '../hooks/useNationWrite';
import { NOTARY } from '../constants';
import { useLogError } from '../hooks';

interface NotaryFormRevokePermissionsProps {
  className?: string;
  label: string;
  onUpdate?: Function;
  defaults?: any;
  contractAddress: string;
}

export const NotaryFormRevokePermissions = ({
  className,
  label,
  onUpdate,
  contractAddress,
}: NotaryFormRevokePermissionsProps) => {
  const classes_ = classNames(className, 'NotaryFormRevokePermissions');

  const {
    register,
    handleSubmit,
    watch,
    formState: {},
  } = useForm({
    defaultValues: {
      citizen: '',
    },
  });
  const watchAllFields = watch();
  const { write, error } = useNationWrite(contractAddress, 'revokeRole', [
    NOTARY,
    watchAllFields?.citizen,
  ]);
  useLogError(error);
  const onSubmit = (_data: any) => {
    write();
    if (onUpdate) onUpdate(_data);
  };

  return (
    <div className={classes_}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input"
          placeholder="weboftrust.eth"
          {...register('citizen', { required: true })}
        />
        <button className="btn btn-default my-3 w-full" type="submit">
          {label}
        </button>
      </form>
    </div>
  );
};

NotaryFormRevokePermissions.defaultProps = {
  label: 'Revoke Notary Status',
};

export default NotaryFormRevokePermissions;
