import * as React from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import useNotaryServiceDelegatableWrite from '../hooks/useNotaryServiceDelegatableWrite';

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
  const {
    watch,
    register,
    handleSubmit,
    formState: {},
  } = useForm({
    defaultValues: {
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
                      delegate: '0xF3f56af54Dc1C855D1e1717Ae9C571BF58ae17b1',
                      authority:
                        '0x0000000000000000000000000000000000000000000000000000000000000000',
                      caveats: [],
                    },
                    signature:
                      '0x930cda5abdc7b68f6bf7cb0c9f71dc899266bacdc486cacd0b292c26a08c5dce0307c12aaeadcb40ec91647a4b64920666afd002f23ce7602542dfa7ddb2d65d1c',
                  },
                ],
                transaction: {
                  to: '0x9Fcca440F19c62CDF7f973eB6DDF218B15d4C71D',
                  gasLimit: '10000000000000000',
                  data: '0x1e83409a000000000000000000000000f3f56af54dc1c855d1e1717ae9c571bf58ae17b1',
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
  label: 'Issue Claim',
};

export default NotaryServiceDelegatableFormClaimInvocation;
