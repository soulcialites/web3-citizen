export type SignedDelegation = {
  signature: string;
  delegation: SignedDelegation;
};

export type Delegation = {
  delegate: string;
  authority: string;
  caveats: Array<Caveat>;
};

export type Caveat = {
  enforcer: string;
  terms: string;
};

export type Invitation = KeylessInvitation | KeyedInvitation;

export type KeylessInvitation = {
  signedDelegations: Array<SignedDelegation>;
  contractInfo?: ContractInfo;
};

export type KeyedInvitation = KeylessInvitation & {
  key: string;
};

export type InvokableTransaction = {
  to: string;
  gasLimit: string;
  data: string;
};

export type Invocation = {
  transaction: InvokableTransaction;
  authority: SignedDelegation[];
};

export type Invocations = {
  batch: Invocation[];
  replayProtection: ReplayProtection;
};

export type SignedInvocation = {
  invocations: Invocations;
  signature: string;
};

export type ReplayProtection = {
  nonce: string;
  queue: string;
};

export type ContractInfo = {
  verifyingContract: string;
  name: string;
  chainId: number;
};

export type OwnerMembershipOpts = {
  contractInfo: ContractInfo;
  key: string;
};

export type KeyInviteMembershipOpts = {
  invitation: Invitation;
  key: string;
};

export type KeylessInviteMembershipOpts = {
  invitation: Invitation;
};

export type MembershipOpts =
  | OwnerMembershipOpts
  | KeyInviteMembershipOpts
  | KeylessInviteMembershipOpts;

export type IntentionToRevoke = {
  delegationHash: string;
};
export type SignedIntentionToRevoke = {
  signature: string;
  intentionToRevoke: IntentionToRevoke;
};

export type Membership = {
  createInvitation(opts?: {
    recipientAddress?: string;
    delegation?: Delegation;
  }): Invitation;
  createMembershipFromDelegation(delegation: Delegation): Membership;
  signDelegation(delegation: Delegation): SignedDelegation;
  signInvocations(invocations: Invocations): SignedInvocation;
  signRevocationMessage(invitation: Invitation): SignedIntentionToRevoke;
};
