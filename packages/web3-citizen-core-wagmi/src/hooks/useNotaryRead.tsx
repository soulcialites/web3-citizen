import { useContractRead } from 'wagmi';
import Notary from '@web3-citizen/core-sol/abis/contracts/Notary/Notary.sol/Notary.json';

export function useNotaryRead(
  address: string,
  method: string,
  args: any[]
): any {
  return useContractRead(
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

export default useNotaryRead;
