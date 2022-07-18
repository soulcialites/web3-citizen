import * as React from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { useNationWrite } from '../hooks/useNationWrite';
import { NOTARY } from '../constants';
import { useLogError } from '../hooks';

interface NotaryFormIsNotaryProps {
  className?: string;
  label: string;
  onUpdate?: Function;
  defaults?: any;
  contractAddress: string;
}

export const NotaryFormIsNotary = ({
  className,
  label,
  onUpdate,
  contractAddress,
}: NotaryFormIsNotaryProps) => {
  const classes_ = classNames(className, 'NotaryFormIsNotary');

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
  const { write, error, data } = useNationWrite(contractAddress, 'hasRole', [
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
        <div className="grid grid-cols-12 gap-x-4 w-full">
          <div className="col-span-8">
            <input
              className="input"
              placeholder="weboftrust.eth"
              {...register('citizen', { required: true })}
            />
          </div>
          <div className="col-span-4 bg-neutral-900 flex items-center justify-center p-2">
            <span className="">
              <span className="font-semibold">Status:</span>{' '}
              {data ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
        <button className="btn btn-default my-3 w-full" type="submit">
          {label}
        </button>
      </form>
    </div>
  );
};

NotaryFormIsNotary.defaultProps = {
  label: 'Check Status',
};

export default NotaryFormIsNotary;
