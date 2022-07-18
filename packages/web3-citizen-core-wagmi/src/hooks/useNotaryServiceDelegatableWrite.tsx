import { useContractWrite } from 'wagmi';
import NotaryServiceDelegatable from '@web3-citizen/core-sol/abis/contracts/Notary/NotaryServiceDelegatable.sol/NotaryServiceDelegatable.json';

export function useNotaryServiceDelegatableWrite(
  address: string,
  method: string,
  args: any[]
): any {
  return useContractWrite(
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

export default useNotaryServiceDelegatableWrite;
