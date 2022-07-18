import { useContractRead } from 'wagmi';
import TrustToken from '@web3-citizen/core-sol/abis/contracts/experiments/TrustToken.sol/TrustToken.json';

export function useTrustTokenRead(
  address: string,
  method: string,
  args: any[]
): any {
  return useContractRead(
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

export default useTrustTokenRead;
