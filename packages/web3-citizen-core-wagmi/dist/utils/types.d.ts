export declare const domain: {
    name: string;
    version: string;
    chainId: number;
};
export declare const types: {
    EIP712Domain: {
        name: string;
        type: string;
    }[];
    Invocation: {
        name: string;
        type: string;
    }[];
    Invocations: {
        name: string;
        type: string;
    }[];
    SignedInvocation: {
        name: string;
        type: string;
    }[];
    Transaction: {
        name: string;
        type: string;
    }[];
    ReplayProtection: {
        name: string;
        type: string;
    }[];
    Delegation: {
        name: string;
        type: string;
    }[];
    Caveat: {
        name: string;
        type: string;
    }[];
    SignedDelegation: {
        name: string;
        type: string;
    }[];
    IntentionToRevoke: {
        name: string;
        type: string;
    }[];
    SignedIntentionToRevoke: {
        name: string;
        type: string;
    }[];
};
export declare const typedMessage: {
    primaryType: string;
    domain: {
        name: string;
        version: string;
    };
    entries: {
        delegate: string;
        caveat: string;
        authority: string;
    };
};
declare const _default: {
    domain: {
        name: string;
        version: string;
        chainId: number;
    };
    types: {
        EIP712Domain: {
            name: string;
            type: string;
        }[];
        Invocation: {
            name: string;
            type: string;
        }[];
        Invocations: {
            name: string;
            type: string;
        }[];
        SignedInvocation: {
            name: string;
            type: string;
        }[];
        Transaction: {
            name: string;
            type: string;
        }[];
        ReplayProtection: {
            name: string;
            type: string;
        }[];
        Delegation: {
            name: string;
            type: string;
        }[];
        Caveat: {
            name: string;
            type: string;
        }[];
        SignedDelegation: {
            name: string;
            type: string;
        }[];
        IntentionToRevoke: {
            name: string;
            type: string;
        }[];
        SignedIntentionToRevoke: {
            name: string;
            type: string;
        }[];
    };
    typedMessage: {
        primaryType: string;
        domain: {
            name: string;
            version: string;
        };
        entries: {
            delegate: string;
            caveat: string;
            authority: string;
        };
    };
};
export default _default;
