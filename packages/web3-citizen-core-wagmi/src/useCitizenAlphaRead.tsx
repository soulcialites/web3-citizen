import { useContractRead } from 'wagmi';
import CitizenAlpha from '@web3-citizen/core-sol/abis/contracts/CitizenAlpha.sol/CitizenAlpha.json';

export function useCitizenAlphaRead(
  address: string,
  method: string,
  args: any[]
): any {
  return useContractRead(
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

export default useCitizenAlphaRead;
