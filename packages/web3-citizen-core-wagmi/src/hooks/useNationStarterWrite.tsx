import { useContractWrite } from 'wagmi';
import NationStarter from '@web3-citizen/core-sol/abis/contracts/Nation/NationStarter.sol/NationStarter.json';

export function useNationStarterWrite(
  address: string,
  method: string,
  args: any[]
): any {
  return useContractWrite(
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

export default useNationStarterWrite;
