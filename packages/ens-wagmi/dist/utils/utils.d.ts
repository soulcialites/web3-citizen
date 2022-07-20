import { Axios } from 'axios';
export declare function isCID(hash: any): boolean;
export declare function assert(condition: any, message: string): void;
export interface BaseError {
}
export declare class BaseError extends Error {
    __proto__: Error;
    constructor(message?: string);
}
export declare class NFTURIParsingError extends BaseError {
}
export declare function parseNFT(uri: string, seperator?: string): {
    chainID: number;
    namespace: string;
    contractAddress: string;
    tokenID: string;
};
export declare function resolveURI(uri: string, customGateway?: string): {
    uri: string;
    isOnChain: boolean;
    isEncoded: boolean;
};
export interface ImageURIOpts {
    metadata: any;
    customGateway?: string;
    jsdomWindow?: any;
}
export declare function getImageURI({ metadata, customGateway, jsdomWindow, }: ImageURIOpts): string | null;
export declare function createCacheAdapter(fetch: Axios, ttl: number): void;
export declare const fetch: import("axios").AxiosInstance;
