import { useContractWrite } from 'wagmi';
import Notary from '@web3-citizen/core-sol/abis/contracts/Notary/Notary.sol/Notary.json';

export function useCitizenNotaryWrite(
  address: string,
  method: string,
  args: any[]
): any {
  return useContractWrite(
    {
      addressOrName: address,
      contractInterface: Notary,
    },
    method,
    {
      args: args,
    }
  );
}

export default useCitizenNotaryWrite;
