import { useContract } from 'wagmi';
import Nation from '@web3-citizen/core-sol/abis/contracts/Nation/Nation.sol/Nation.json';

export function useNationContract(address: string): any {
  return useContract({
    addressOrName: address,
    contractInterface: Nation,
  });
}

export default useNationContract;
