import * as React from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { useCitizenNotaryWrite } from '../useCitizenNotaryWrite';
import { useLogError, useLogTransactionWrite } from '../hooks';
import { utils } from 'ethers';

interface NotaryFormRoleGrantProps {
  className?: string;
  label: string;
  onUpdate?: Function;
  defaults?: any;
  contractAddress: string;
}

export const NotaryFormRoleGrant = ({
  className,
  label,
  onUpdate,
  contractAddress,
}: NotaryFormRoleGrantProps) => {
  const classes_ = classNames(className, 'NotaryFormRoleGrant');

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
  const { write, error, data } = useCitizenNotaryWrite(
    contractAddress,
    'grantRole',
    [
      utils.keccak256(utils.toUtf8Bytes(watchAllFields.role)),
      watchAllFields.citizen,
    ]
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
        <input
          className="input"
          placeholder="NOTARY"
          {...register('role', { required: true })}
        />
        <input
          className="input mt-2"
          placeholder="web3oftrust.eth"
          {...register('citizen', { required: true })}
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

NotaryFormRoleGrant.defaultProps = {
  label: 'Grant Role',
};

export default NotaryFormRoleGrant;
