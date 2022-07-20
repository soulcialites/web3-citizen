import * as React from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { useNotaryServiceDelegatableContract } from '../hooks/useNotaryServiceDelegatableContract';
import { useSigner } from 'wagmi';
import { createDelegation } from '../utils/createDelegation';
import { createIntention } from '../utils/createIntention';
// @ts-ignore
const { recoverDelegationSigner } = require('eth-delegatable-utils');

interface NotaryServiceDelegatableFormClaimDelegateProps {
  className?: string;
  label: string;
  onUpdate?: Function;
  defaults?: any;
  contractAddress: string;
}
export const NotaryServiceDelegatableFormClaimDelegate = ({
  className,
  label,
  onUpdate,
  contractAddress,
}: NotaryServiceDelegatableFormClaimDelegateProps) => {
  const classes_ = classNames(
    className,
    'NotaryServiceDelegatableFormClaimDelegate'
  );
  const signer = useSigner();
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm({
    defaultValues: {
      to: '',
    },
  });
  //   const watchAllFields = watch();
  const contract = useNotaryServiceDelegatableContract(contractAddress);

  //   useLogError(error);
  const [signatures, setSignatures] = React.useState<any>();
  const onSubmit = (_data: any) => {
    (async () => {
      const method = 'eth_signTypedData_v4';
      const txPopulated = await contract.populateTransaction.issue(_data.to);
      const me = await signer.data?.getAddress();
      const delegation = createDelegation(_data.to, contractAddress);
      // @ts-ignore
      const signedDelegation1 = await signer.data?.provider?.send(method, [
        me,
        delegation.string,
      ]);
      const intention = createIntention(
        delegation.delegation,
        signedDelegation1,
        contractAddress,
        txPopulated.data
      );
      // @ts-ignore
      const signedDelegation2 = await signer.data?.provider.send(method, [
        me,
        intention.string,
      ]);
      setSignatures({
        delegation: signedDelegation1,
        invocation: signedDelegation2,
      });
    })();
    if (onUpdate) onUpdate(_data);
  };

  return (
    <div className={classes_}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input"
          placeholder="weboftrust.eth"
          {...register('to', { required: true })}
        />
        <button className="btn btn-default my-3 w-full" type="submit">
          {label}
        </button>
      </form>
      {signatures && (
        <div className="text-sm">
          <span className="block break-all">
            Delegation: <br /> {signatures.delegation}
          </span>
          <span className="block break-all">
            Invocation: <br /> {signatures.invocation}
          </span>
        </div>
      )}
    </div>
  );
};

NotaryServiceDelegatableFormClaimDelegate.defaultProps = {
  label: 'Sign Delegation & Invocations',
};

export default NotaryServiceDelegatableFormClaimDelegate;
