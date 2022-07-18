import { useContractWrite } from 'wagmi';
import Nation from '@web3-citizen/core-sol/abis/contracts/Nation/Nation.sol/Nation.json';

export function useNationWrite(
  address: string,
  method: string,
  args: any[]
): any {
  return useContractWrite(
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

export default useNationWrite;
