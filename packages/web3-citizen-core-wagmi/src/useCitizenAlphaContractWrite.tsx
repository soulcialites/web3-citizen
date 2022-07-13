import { useContractWrite } from 'wagmi';
import CitizenAlpha from '@web3-citizen/core-sol/deployments/localhost/CitizenAlpha.json';

export function useCitizenAlphaContractWrite(
  address: string,
  method: string,
  args: any[]
): any {
  return useContractWrite(
    {
      addressOrName: address,
      contractInterface: CitizenAlpha.abi,
    },
    method,
    {
      args: args,
    }
  );
}

export default useCitizenAlphaContractWrite;
