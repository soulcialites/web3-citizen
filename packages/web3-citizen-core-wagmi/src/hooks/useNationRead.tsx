import { useContractRead } from 'wagmi';
import Nation from '@web3-citizen/core-sol/abis/contracts/Nation/Nation.sol/Nation.json';

export function useNationRead(
  address: string,
  method: string,
  args: any[]
): any {
  return useContractRead(
    {
      addressOrName: address,
      contractInterface: Nation,
    },
    method,
    {
      args: args,
    }
  );
}

export default useNationRead;
