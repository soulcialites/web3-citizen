import * as React from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { useCitizenNotaryWrite } from '../useCitizenNotaryWrite';
import InputWithLabel from '../InputWithLabel';
import { FOUNDER } from '../constants';

interface NotaryFormIsFounderProps {
  className?: string;
  onUpdate?: Function;
  defaults?: any;
  contractAddress: string;
}

export const NotaryFormIsFounder = ({
  className,
  onUpdate,
  contractAddress,
}: NotaryFormIsFounderProps) => {
  const styleForm = classNames(className, 'NotaryFormIsFounder');

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
  const { write, error, data } = useCitizenNotaryWrite(contractAddress, 'hasRole', [
    FOUNDER,
    watchAllFields?.citizen,
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
        <div className='grid grid-cols-12 gap-x-4 w-full'>
            <div className="col-span-8">
              <InputWithLabel
                name="citizen"
                label="Citizen"
                placeholder="weboftrust.eth"
                register={register}
              />
            </div>
            <div className='col-span-4 bg-neutral-900 flex items-center justify-center p-2 mt-5' style={{background: "blue"}}>
                <span className=''>{data ? "Is Founder" : "Not Founder"}</span>
            </div>
        </div>
        <button className="btn btn-blue w-full mt-4 inline-block" type="submit">
          Check
        </button>
      </form>
    </div>
  );
};

export default NotaryFormIsFounder;
