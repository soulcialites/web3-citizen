export declare type SignedDelegation = {
    signature: string;
    delegation: SignedDelegation;
};
export declare type Delegation = {
    delegate: string;
    authority: string;
    caveats: Array<Caveat>;
};
export declare type Caveat = {
    enforcer: string;
    terms: string;
};
export declare type Invitation = KeylessInvitation | KeyedInvitation;
export declare type KeylessInvitation = {
    signedDelegations: Array<SignedDelegation>;
    contractInfo?: ContractInfo;
};
export declare type KeyedInvitation = KeylessInvitation & {
    key: string;
};
export declare type InvokableTransaction = {
    to: string;
    gasLimit: string;
    data: string;
};
export declare type Invocation = {
    transaction: InvokableTransaction;
    authority: SignedDelegation[];
};
export declare type Invocations = {
    batch: Invocation[];
    replayProtection: ReplayProtection;
};
export declare type SignedInvocation = {
    invocations: Invocations;
    signature: string;
};
export declare type ReplayProtection = {
    nonce: string;
    queue: string;
};
export declare type ContractInfo = {
    verifyingContract: string;
    name: string;
    chainId: number;
};
export declare type OwnerMembershipOpts = {
    contractInfo: ContractInfo;
    key: string;
};
export declare type KeyInviteMembershipOpts = {
    invitation: Invitation;
    key: string;
};
export declare type KeylessInviteMembershipOpts = {
    invitation: Invitation;
};
export declare type MembershipOpts = OwnerMembershipOpts | KeyInviteMembershipOpts | KeylessInviteMembershipOpts;
export declare type IntentionToRevoke = {
    delegationHash: string;
};
export declare type SignedIntentionToRevoke = {
    signature: string;
    intentionToRevoke: IntentionToRevoke;
};
export declare type Membership = {
    createInvitation(opts?: {
        recipientAddress?: string;
        delegation?: Delegation;
    }): Invitation;
    createMembershipFromDelegation(delegation: Delegation): Membership;
    signDelegation(delegation: Delegation): SignedDelegation;
    signInvocations(invocations: Invocations): SignedInvocation;
    signRevocationMessage(invitation: Invitation): SignedIntentionToRevoke;
};
