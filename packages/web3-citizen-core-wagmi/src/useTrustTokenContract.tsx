import { useContract } from 'wagmi';
import TrustToken from '@web3-citizen/core-sol/artifacts/contracts/TrustToken.sol/TrustToken.json';

export function useTrustTokenContract(address: string): any {
  return useContract({
    addressOrName: address,
    contractInterface: TrustToken.abi,
  });
}

export default useTrustTokenContract;
