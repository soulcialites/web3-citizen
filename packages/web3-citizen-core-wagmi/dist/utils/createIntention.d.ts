export declare function createIntention(delegation: any, signedDelegation: any, verifyingContract: string, tx: string): {
    intention: {
        replayProtection: {
            nonce: string;
            queue: string;
        };
        batch: {
            authority: {
                delegation: any;
                signature: any;
            }[];
            transaction: {
                to: string;
                gasLimit: string;
                data: string;
            };
        }[];
    };
    string: string;
};
