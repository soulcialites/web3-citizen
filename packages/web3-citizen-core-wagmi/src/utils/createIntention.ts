import { domain, types } from './types';

export function createIntention(
  delegation: any,
  signedDelegation: any,
  verifyingContract: string,
  tx: string
) {
  const intention = {
    replayProtection: {
      nonce: '0x01',
      queue: '0x00',
    },
    batch: [
      {
        authority: [
          {
            delegation: delegation,
            signature: signedDelegation,
          },
        ],
        transaction: {
          to: verifyingContract,
          gasLimit: '10000000000000000',
          data: tx,
        },
      },
    ],
  };

  const intentionString = JSON.stringify({
    domain: {...domain, verifyingContract: verifyingContract},
    message: intention,
    primaryType: 'Invocations',
    types: types,
  });

  return {
    intention: intention,
    string: intentionString,
  };
}
