import { useContractWrite } from 'wagmi';
import TrustToken from '@web3-citizen/core-sol/artifacts/contracts/TrustToken.sol/TrustToken.json';

export function useTrustTokenContractWrite(
  address: string,
  method: string,
  args: any[]
): any {
  return useContractWrite(
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

export default useTrustTokenContractWrite;
