import * as React from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { useCitizenNotaryWrite } from './useCitizenNotaryWrite';
import InputWithLabel from './InputWithLabel';
import { useLogError } from './hooks';

interface FormCitizenIssueProps {
  className?: string;
  label: string;
  onUpdate?: Function;
  defaults?: any;
  contractAddress: string;
}

export const FormCitizenIssue = ({
  className,
  label,
  onUpdate,
  contractAddress,
}: FormCitizenIssueProps) => {
  const styleForm = classNames(className, 'FormCitizenIssue');

  const {
    register,
    handleSubmit,
    watch,
    formState: {},
  } = useForm({
    defaultValues: {
      to: '',
    },
  });
  const watchAllFields = watch();
  const { write, error } = useCitizenNotaryWrite(contractAddress, 'issue', [
    watchAllFields?.to,
  ]);
  const onSubmit = (_data: any) => {
    write();
    if (onUpdate) onUpdate(_data);
  };
  useLogError(error);

  return (
    <div className={styleForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4">
          <InputWithLabel
            name="to"
            label="Citizen"
            placeholder="vitalik.eth"
            register={register}
          />
        </div>
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
FormCitizenIssue.defaultProps = {
  label: 'Issue Citizenship',
};
export default FormCitizenIssue;
