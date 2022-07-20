import { BaseProvider } from '@ethersproject/providers';
export default class ERC721 {
    getMetadata(provider: BaseProvider, ownerAddress: string | undefined | null, contractAddress: string, tokenID: string): Promise<any>;
}
