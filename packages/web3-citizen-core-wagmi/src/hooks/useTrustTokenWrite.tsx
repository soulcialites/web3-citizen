import { useContractWrite } from 'wagmi';
import TrustToken from '@web3-citizen/core-sol/abis/contracts/experiments/TrustToken.sol/TrustToken.json';

export function useTrustTokenWrite(
  address: string,
  method: string,
  args: any[]
): any {
  return useContractWrite(
    {
      addressOrName: address,
      contractInterface: TrustToken,
    },
    method,
    {
      args: args,
    }
  );
}

export default useTrustTokenWrite;
