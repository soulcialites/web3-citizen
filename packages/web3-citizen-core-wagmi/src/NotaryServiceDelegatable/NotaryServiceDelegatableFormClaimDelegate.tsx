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
  const onSubmit = (_data: any) => {
    (async () => {
      const method = 'eth_signTypedData_v4';
      const txPopulated = await contract.populateTransaction.claim(_data.to);
      const me = await signer.data?.getAddress();
      console.log(me, 'me');
      const delegation = createDelegation(_data.to);
      // @ts-ignore
      const signedDelegation1 = await signer.data?.provider?.send(method, [
        me,
        delegation.string,
      ]);

      const recoverered = recoverDelegationSigner(
        { delegation: delegation.delegation, signature: signedDelegation1 },
        {
          chainId: 1,
          verifyingContract: '0x9Fcca440F19c62CDF7f973eB6DDF218B15d4C71D',
          name: 'NotaryServiceDelegatable',
        }
      );
      console.log(recoverered, 'recoverered');
      const intention = createIntention(
        delegation.delegation,
        signedDelegation1,
        contractAddress,
        txPopulated.data
      );
      console.log(intention);
      // @ts-ignore
      const signedDelegation2 = await signer.data?.provider.send(method, [
        me,
        intention.string,
      ]);
      console.log(signedDelegation2, 'signedDelegation2');
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
    </div>
  );
};

NotaryServiceDelegatableFormClaimDelegate.defaultProps = {
  label: 'Issue Claim',
};

export default NotaryServiceDelegatableFormClaimDelegate;
