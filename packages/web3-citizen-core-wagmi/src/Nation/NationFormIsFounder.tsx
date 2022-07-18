import * as React from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { useNationWrite } from '../hooks/useNationWrite';
import { FOUNDER } from '../constants';
import { useLogError } from '../hooks';
import InputWithSideLabel from '../InputWithSideLabel';

interface NationFormIsFounderProps {
  className?: string;
  label: string;
  onUpdate?: Function;
  defaults?: any;
  contractAddress: string;
}

export const NationFormIsFounder = ({
  className,
  label,
  onUpdate,
  contractAddress,
}: NationFormIsFounderProps) => {
  const classes_ = classNames(className, 'NationFormIsFounder');

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
    FOUNDER,
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
            <InputWithSideLabel
              name="citizen"
              placeholder="vitalik.eth"
              label="Citizen"
              register={register}
            />
          </div>
          <div className="col-span-4 bg-slate-800 rounded-md text-white flex items-center justify-center p-2">
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

NationFormIsFounder.defaultProps = {
  label: 'Check Status',
};

export default NationFormIsFounder;
