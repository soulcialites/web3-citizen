import { useContract } from 'wagmi';
import NotaryServiceDelegatable from '@web3-citizen/core-sol/abis/contracts/Notary/NotaryServiceDelegatable.sol/NotaryServiceDelegatable.json';

export function useNotaryServiceDelegatableContract(address: string): any {
  return useContract({
    addressOrName: address,
    contractInterface: NotaryServiceDelegatable,
  });
}

export default useNotaryServiceDelegatableContract;
