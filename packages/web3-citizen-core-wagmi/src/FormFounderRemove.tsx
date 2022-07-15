import * as React from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { useCitizenNotaryWrite } from './useCitizenNotaryWrite';
import InputWithLabel from './InputWithLabel';

interface FormFounderRemoveProps {
  className?: string;
  onUpdate?: Function;
  defaults?: any;
  contractAddress: string;
}

export const FormFounderRemove = ({
  className,
  onUpdate,
  contractAddress,
}: FormFounderRemoveProps) => {
  const styleForm = classNames(className, 'FormFounderRemove');

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
  const { write } = useCitizenNotaryWrite(
    contractAddress,
    'removeFounder',
    [watchAllFields?.from]
  );
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
            label="Founder"
            placeholder="kames.eth"
            register={register}
          />
        </div>
        <button className="btn btn-blue w-full mt-4" type="submit">
          Remove Founder
        </button>
      </form>
    </div>
  );
};

export default FormFounderRemove;
