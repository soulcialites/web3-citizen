import * as React from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import InputWithLabel from './InputWithLabel';
import {
  useResolverContractWrite,
  useResolverContract,
} from '@turbo-eth/ens-wagmi';
// import { useEnsResolver } from 'wagmi'
interface FormCitizenEnsUpdateProps {
  className?: string;
  onUpdate?: Function;
  defaults?: any;
  contractAddress: string;
  ensNode: string;
  defaultValues?: any;
}

export const FormCitizenEnsUpdate = ({
  className,
  onUpdate,
  contractAddress,
  ensNode,
  defaultValues = {
    url: '',
    description: '',
    did: '',
    ['com.twitter']: '',
    ['com.github']: '',
  },
}: FormCitizenEnsUpdateProps) => {
  const styleForm = classNames(className, 'FormCitizenEnsUpdate');

  const {
    register,
    handleSubmit,
    watch,
    formState: {},
  } = useForm({
    defaultValues: defaultValues,
  });
  const watchAllFields = watch();
  const contractResolver = useResolverContract(contractAddress);
  const [inputs, setInputs] = React.useState<any>();
  const { write } = useResolverContractWrite(contractAddress, 'multicall', [
    inputs,
  ]);

  const onSubmit = async (_data: any) => {
    const url_ = await contractResolver.populateTransaction.setText(
      ensNode,
      'url',
      watchAllFields.description
    );
    const avatar_ = await contractResolver.populateTransaction.setText(
      ensNode,
      'avatar',
      watchAllFields.description
    );
    const did_ = await contractResolver.populateTransaction.setText(
      ensNode,
      'did',
      watchAllFields.description
    );
    const description_ = await contractResolver.populateTransaction.setText(
      ensNode,
      'description',
      watchAllFields.description
    );
    setInputs([url_.data, avatar_.data, did_.data, description_.data,]);
    if (onUpdate) onUpdate(_data);
  };

  React.useEffect(() => {
    if (inputs) {
      write();
    }
  }, [inputs]);

  return (
    <div className={styleForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <InputWithLabel
            name="url"
            label="URL"
            placeholder="www.site.me"
            register={register}
          />
          <InputWithLabel
            name="avatar"
            label="Avatar"
            placeholder="ipfs://"
            register={register}
          />
          <InputWithLabel
            name="did"
            label="Decentralized Identifier (DID)"
            placeholder="did:eth:0x000...000"
            register={register}
          />
          <InputWithLabel
            name="description"
            label="Description"
            placeholder="I am..."
            register={register}
          />
          <InputWithLabel
            name="com.twitter"
            label="Twitter"
            placeholder=""
            register={register}
          />
          <InputWithLabel
            name="com.github"
            label="Github"
            placeholder=""
            register={register}
          />
          <InputWithLabel
            name="notice"
            label="Notice"
            placeholder=""
            register={register}
          />
        </div>
        <button className="btn btn-blue btn-sm w-full mt-6" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default FormCitizenEnsUpdate;
