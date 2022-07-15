import { useContractWrite } from 'wagmi';
import CitizenNotary from '@web3-citizen/core-sol/artifacts/contracts/CitizenNotary.sol/CitizenNotary.json';

export function useCitizenNotaryWrite(
  address: string,
  method: string,
  args: any[]
): any {
  return useContractWrite(
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

export default useCitizenNotaryWrite;
