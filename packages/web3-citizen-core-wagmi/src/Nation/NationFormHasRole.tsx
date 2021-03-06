import * as React from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { InputWithSideLabel } from '../InputWithSideLabel';
import { useNationWrite } from '../hooks/useNationWrite';
import { useLogError } from '../hooks';
import { utils } from 'ethers';

interface NationFormHasRoleProps {
  className?: string;
  label: string;
  onUpdate?: Function;
  defaults?: any;
  contractAddress: string;
}

export const NationFormHasRole = ({
  className,
  label,
  onUpdate,
  contractAddress,
}: NationFormHasRoleProps) => {
  const classes_ = classNames(className, 'NationFormHasRole');

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
  const { write, error, data } = useNationWrite(contractAddress, 'hasRole', [
    utils.keccak256(utils.toUtf8Bytes(watchAllFields.role)),
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
              name="role"
              placeholder="FOUNDER"
              label="Role"
              register={register}
            />
            <InputWithSideLabel
              name="citizen"
              className="mt-3"
              placeholder="vitalik.eth"
              label="Citizen"
              register={register}
            />
          </div>
          <div className="col-span-4 bg-slate-700 rounded-md text-white flex items-center justify-center p-2">
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

NationFormHasRole.defaultProps = {
  label: 'Check Status',
};

export default NationFormHasRole;
