import * as React from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import useNotaryServiceDelegatableWrite from '../hooks/useNotaryServiceDelegatableWrite';

interface NotaryServiceDelegatableFormClaimProps {
  className?: string;
  label: string;
  onUpdate?: Function;
  defaults?: any;
  contractAddress: string;
}
export const NotaryServiceDelegatableFormClaim = ({
  className,
  label,
  onUpdate,
  contractAddress,
}: NotaryServiceDelegatableFormClaimProps) => {
  const classes_ = classNames(className, 'NotaryServiceDelegatableFormClaim');
  const {
    watch,
    register,
    handleSubmit,
    formState: {},
  } = useForm({
    defaultValues: {
      to: '',
    },
  });
  const watchAllFields = watch();
  const { write } = useNotaryServiceDelegatableWrite(contractAddress, 'claim', [
    watchAllFields.to,
  ]);

  const onSubmit = (_data: any) => {
    write();
    if (onUpdate) onUpdate(_data);
  };

  return (
    <div className={classes_}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input"
          placeholder="0x0"
          {...register('to', { required: true })}
        />
        <button className="btn btn-default my-3 w-full" type="submit">
          {label}
        </button>
      </form>
    </div>
  );
};

NotaryServiceDelegatableFormClaim.defaultProps = {
  label: 'Issue Claim',
};

export default NotaryServiceDelegatableFormClaim;
