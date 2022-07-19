import { useContractWrite } from 'wagmi';
import CitizenAlpha from '@web3-citizen/core-sol/abis/contracts/CitizenAlpha.sol/CitizenAlpha.json';

export function useCitizenAlphaWrite(
  address: string,
  method: string,
  args: any[]
): any {
  return useContractWrite(
    {
      addressOrName: address,
      contractInterface: CitizenAlpha,
    },
    method,
    {
      args: args,
    }
  );
}

export default useCitizenAlphaWrite;
