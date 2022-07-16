import { useContract } from 'wagmi';
import Notary from '@web3-citizen/core-sol/abis/contracts/Notary/Notary.sol/Notary.json';

export function useCitizenNotaryContract(address: string): any {
  return useContract({
    addressOrName: address,
    contractInterface: Notary,
  });
}

export default useCitizenNotaryContract;
