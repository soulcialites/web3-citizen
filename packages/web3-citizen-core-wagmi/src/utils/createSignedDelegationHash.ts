import types from './types';
import sigUtil from '@metamask/eth-sig-util';

export function createSignedDelegationHash(signedDelegation: any) {
  return sigUtil.TypedDataUtils.hashStruct(
    'SignedDelegation',
    signedDelegation,
    types.types,
    'V4'
  );
}
