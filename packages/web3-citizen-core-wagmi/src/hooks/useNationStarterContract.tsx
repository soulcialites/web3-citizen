import { useContract } from 'wagmi';
import NationStarter from '@web3-citizen/core-sol/abis/contracts/Nation/NationStarter.sol/NationStarter.json';

export function useNationStarterContract(
  address: string,
): any {
  return useContract(
    {
      addressOrName: address,
      contractInterface: NationStarter,
    },
  );
}

export default useNationStarterContract;
