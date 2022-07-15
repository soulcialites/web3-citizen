import * as React from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { useCitizenNotaryWrite } from './useCitizenNotaryWrite';
import InputWithLabel from './InputWithLabel';

interface FormCitizenRevokeProps {
  className?: string;
  onUpdate?: Function;
  defaults?: any;
  contractAddress: string;
}

export const FormCitizenRevoke = ({
  className,
  onUpdate,
  contractAddress,
}: FormCitizenRevokeProps) => {
  const styleForm = classNames(className, 'FormCitizenRevoke');

  const {
    register,
    handleSubmit,
    watch,
    formState: {},
  } = useForm({
    defaultValues: {
      from: '',
    },
  });
  const watchAllFields = watch();
  const { write } = useCitizenNotaryWrite(contractAddress, 'revoke', [
    watchAllFields?.from,
  ]);
  const onSubmit = (_data: any) => {
    write();
    if (onUpdate) onUpdate(_data);
  };

  return (
    <div className={styleForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4">
          <InputWithLabel
            name="from"
            label="Citizen"
            placeholder="weboftrust.eth"
            register={register}
          />
        </div>
        <button className="btn btn-blue w-full mt-4" type="submit">
          Revoke Citizenship
        </button>
      </form>
    </div>
  );
};

export default FormCitizenRevoke;
