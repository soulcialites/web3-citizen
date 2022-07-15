import { useContractRead } from 'wagmi';
import CitizenNotary from '@web3-citizen/core-sol/artifacts/contracts/CitizenNotary.sol/CitizenNotary.json';

export function useCitizenNotaryRead(
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

export default useCitizenNotaryRead;
