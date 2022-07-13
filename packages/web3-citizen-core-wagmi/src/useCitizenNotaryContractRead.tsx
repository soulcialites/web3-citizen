import { useContractRead } from 'wagmi';
import CitizenNotary from '@web3-citizen/core-sol/deployments/localhost/CitizenNotary.json';

export function useCitizenNotaryContractRead(
  address: string,
  method: string,
  args: any[]
): any {
  return useContractRead(
    {
      addressOrName: address,
      contractInterface: CitizenNotary.abi,
    },
    method,
    {
      args: args,
    }
  );
}

export default useCitizenNotaryContractRead;
