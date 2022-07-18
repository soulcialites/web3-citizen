import { useContractRead } from 'wagmi';
import NotaryServiceDelegatable from '@web3-citizen/core-sol/abis/contracts/Notary/NotaryServiceDelegatable.sol/NotaryServiceDelegatable.json';

export function useNotaryServiceDelegatableRead(
  address: string,
  method: string,
  args: any[]
): any {
  return useContractRead(
    {
      addressOrName: address,
      contractInterface: NotaryServiceDelegatable,
    },
    method,
    {
      args: args,
    }
  );
}

export default useNotaryServiceDelegatableRead;
