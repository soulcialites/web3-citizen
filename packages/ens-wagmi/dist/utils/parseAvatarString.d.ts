import { BaseProvider } from '@ethersproject/providers';
export declare function handleSettled(promises: Promise<any>[]): Promise<any[]>;
export interface Spec {
    getMetadata: (provider: BaseProvider, ownerAddress: string | undefined | null, contractAddress: string, tokenID: string) => Promise<any>;
}
export declare const specs: {
    [key: string]: new () => Spec;
};
export declare function parseAvatarString(walletAddress: string, avatarURI: string, provider: BaseProvider): Promise<string | null>;
