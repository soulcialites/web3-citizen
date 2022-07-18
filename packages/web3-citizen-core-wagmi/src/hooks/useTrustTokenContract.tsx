import { useContract } from 'wagmi';
import TrustToken from '@web3-citizen/core-sol/abis/contracts/experiments/TrustToken.sol/TrustToken.json';

export function useTrustTokenContract(address: string): any {
  return useContract({
    addressOrName: address,
    contractInterface: TrustToken,
  });
}

export default useTrustTokenContract;
