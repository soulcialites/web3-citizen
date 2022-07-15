import { useContract } from 'wagmi';
import CitizenNotary from '@web3-citizen/core-sol/artifacts/contracts/CitizenNotary.sol/CitizenNotary.json';

export function useCitizenNotaryContract(
  address: string,
): any {
  return useContract(
    {
      addressOrName: address,
      contractInterface: CitizenNotary.abi,
    },
  );
}

export default useCitizenNotaryContract;
