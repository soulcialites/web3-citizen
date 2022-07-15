import * as React from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { useCitizenNotaryWrite } from './useCitizenNotaryWrite';
import InputWithLabel from './InputWithLabel';

interface FormCitizenIssueProps {
  className?: string;
  onUpdate?: Function;
  defaults?: any;
  contractAddress: string;
}

export const FormCitizenIssue = ({
  className,
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
  React.useEffect( () => { 
    console.log(error)
  }, [error])

  return (
    <div className={styleForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4">
          <InputWithLabel
            name="to"
            label="Citizen"
            placeholder="weboftrust.eth"
            register={register}
          />
        </div>
        <button className="btn btn-blue w-full mt-4 inline-block" type="submit">
          Issue Citizenship
        </button>
      </form>
    </div>
  );
};

export default FormCitizenIssue;
