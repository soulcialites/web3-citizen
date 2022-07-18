export const domain = {
  name: 'NotaryServiceDelegatable',
  version: '1',
  chainId: 1,
  verifyingContract: '0x9Fcca440F19c62CDF7f973eB6DDF218B15d4C71D',
};

export const types_step_one = {
  Delegation: [
    { name: 'delegate', type: 'address' },
    { name: 'authority', type: 'bytes32' },
    { name: 'caveats', type: 'Caveat[]' },
  ],
  Caveat: [
    { name: 'enforcer', type: 'address' },
    { name: 'terms', type: 'bytes' },
  ],
};

export const types_step_two = {
  Invocation: [
    { name: 'transaction', type: 'Transaction' },
    { name: 'authority', type: 'SignedDelegation[]' },
  ],
  Invocations: [
    { name: 'batch', type: 'Invocation[]' },
    { name: 'replayProtection', type: 'ReplayProtection' },
  ],
  Delegation: [
    { name: 'delegate', type: 'address' },
    { name: 'authority', type: 'bytes32' },
    { name: 'caveats', type: 'Caveat[]' },
  ],
  Caveat: [
    { name: 'enforcer', type: 'address' },
    { name: 'terms', type: 'bytes' },
  ],
  SignedDelegation: [
    { name: 'delegation', type: 'Delegation' },
    { name: 'signature', type: 'bytes' },
  ],
  ReplayProtection: [
    { name: 'nonce', type: 'uint' },
    { name: 'queue', type: 'uint' },
  ],
  Transaction: [
    { name: 'to', type: 'address' },
    { name: 'gasLimit', type: 'uint256' },
    { name: 'data', type: 'bytes' },
  ],
};

export const types = {
  EIP712Domain: [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' },
  ],
  Invocation: [
    { name: 'transaction', type: 'Transaction' },
    { name: 'authority', type: 'SignedDelegation[]' },
  ],
  Invocations: [
    { name: 'batch', type: 'Invocation[]' },
    { name: 'replayProtection', type: 'ReplayProtection' },
  ],
  SignedInvocation: [
    { name: 'invocations', type: 'Invocations' },
    { name: 'signature', type: 'bytes' },
  ],
  Transaction: [
    { name: 'to', type: 'address' },
    { name: 'gasLimit', type: 'uint256' },
    { name: 'data', type: 'bytes' },
  ],
  ReplayProtection: [
    { name: 'nonce', type: 'uint' },
    { name: 'queue', type: 'uint' },
  ],
  Delegation: [
    { name: 'delegate', type: 'address' },
    { name: 'authority', type: 'bytes32' },
    { name: 'caveats', type: 'Caveat[]' },
  ],
  Caveat: [
    { name: 'enforcer', type: 'address' },
    { name: 'terms', type: 'bytes' },
  ],
  SignedDelegation: [
    { name: 'delegation', type: 'Delegation' },
    { name: 'signature', type: 'bytes' },
  ],
  IntentionToRevoke: [{ name: 'delegationHash', type: 'bytes32' }],
  SignedIntentionToRevoke: [
    { name: 'signature', type: 'bytes' },
    { name: 'intentionToRevoke', type: 'IntentionToRevoke' },
  ],
};

export const typedMessage = {
  primaryType: 'Delegation',
  domain: {
    name: 'NotaryServiceDelegatable',
    version: '1',
  },

  entries: {
    delegate: 'address',
    caveat: 'Caveat',
    authority: 'SignedDelegation',
  },
};

export default {
  domain,
  types,
  types_step_one,
  types_step_two,
  typedMessage,
};
