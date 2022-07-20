import * as React from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import useNotaryServiceDelegatableWrite from '../hooks/useNotaryServiceDelegatableWrite';
import { useAccount } from 'wagmi';

interface NotaryServiceDelegatableFormClaimInvocationProps {
  className?: string;
  label: string;
  onUpdate?: Function;
  defaults?: any;
  contractAddress: string;
}
export const NotaryServiceDelegatableFormClaimInvocation = ({
  className,
  label,
  onUpdate,
  contractAddress,
}: NotaryServiceDelegatableFormClaimInvocationProps) => {
  const classes_ = classNames(
    className,
    'NotaryServiceDelegatableFormClaimInvocation'
  );

  const account = useAccount();

  const {
    watch,
    register,
    handleSubmit,
    formState: {},
  } = useForm({
    defaultValues: {
      delegation: '',
      invocation: '',
    },
  });
  const watchAllFields = watch();
  const { write } = useNotaryServiceDelegatableWrite(
    contractAddress,
    'invoke',
    [
      [
        {
          invocations: {
            replayProtection: {
              nonce: '0x01',
              queue: '0x00',
            },
            batch: [
              {
                authority: [
                  {
                    delegation: {
                      delegate: account.data?.address,
                      authority:
                        '0x0000000000000000000000000000000000000000000000000000000000000000',
                      caveats: [],
                    },
                    signature: watchAllFields.delegation,
                  },
                ],
                transaction: {
                  to: contractAddress,
                  gasLimit: '10000000000000000',
                  data: `0x71e928af000000000000000000000000${account.data?.address?.substring(
                    2
                  )}`,
                },
              },
            ],
          },
          signature: watchAllFields?.invocation,
        },
      ],
    ]
  );

  const onSubmit = (_data: any) => {
    write();
    if (onUpdate) onUpdate(_data);
  };

  return (
    <div className={classes_}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="text-sm font-semibold my-2">Delegation</label>
        <input
          className="input"
          placeholder="0x0"
          {...register('delegation', { required: true })}
        />
        <label className="text-sm font-semibold my-2">Invocation</label>
        <input
          className="input"
          placeholder="0x0"
          {...register('invocation', { required: true })}
        />
        <button className="btn btn-default my-3 w-full" type="submit">
          {label}
        </button>
      </form>
    </div>
  );
};

NotaryServiceDelegatableFormClaimInvocation.defaultProps = {
  label: 'Claim Citizenship',
};

export default NotaryServiceDelegatableFormClaimInvocation;
