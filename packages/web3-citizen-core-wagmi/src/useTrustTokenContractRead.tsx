import { useContractRead } from 'wagmi';
import TrustToken from '@web3-citizen/core-sol/artifacts/contracts/TrustToken.sol/TrustToken.json';

export function useTrustTokenContractRead(
  address: string,
  method: string,
  args: any[]
): any {
  return useContractRead(
    {
      addressOrName: address,
      contractInterface: TrustToken.abi,
    },
    method,
    {
      args: args,
    }
  );
}

export default useTrustTokenContractRead;
