import { domain, types } from './types';

export function createDelegation(to: string, verifyingContract: string) {
  const delegation = {
    delegate: to,
    authority:
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    caveats: [],
  };

  const delegationString = JSON.stringify({
    domain: {...domain, verifyingContract: verifyingContract},
    message: delegation,
    primaryType: 'Delegation',
    types: types,
  });
  return {
    delegation,
    string: delegationString,
  };
}
