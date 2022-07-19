import * as React from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { useNationWrite } from '../hooks/useNationWrite';
import { NOTARY } from '../constants';
import { useLogError } from '../hooks';

interface NotaryFormGrantPermissionsProps {
  className?: string;
  label: string;
  onUpdate?: Function;
  defaults?: any;
  contractAddress: string;
}

export const NotaryFormGrantPermissions = ({
  className,
  label,
  onUpdate,
  contractAddress,
}: NotaryFormGrantPermissionsProps) => {
  const classes_ = classNames(className, 'NotaryFormGrantPermissions');

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
  const { write, error } = useNationWrite(contractAddress, 'grantRole', [
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

NotaryFormGrantPermissions.defaultProps = {
  label: 'Grant Notary Status',
};

export default NotaryFormGrantPermissions;
