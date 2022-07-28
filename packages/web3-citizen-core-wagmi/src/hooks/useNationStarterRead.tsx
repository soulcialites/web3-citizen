import { useContractRead } from 'wagmi';
import NationStarter from '@web3-citizen/core-sol/abis/contracts/Nation/NationStarter.sol/NationStarter.json';

export function useNationStarterRead(
  address: string,
  method: string,
  args: any[]
): any {
  return useContractRead(
    {
      addressOrName: address,
      contractInterface: NationStarter,
    },
    method,
    {
      args: args,
    }
  );
}

export default useNationStarterRead;
