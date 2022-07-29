import { useContractRead } from 'wagmi';
import Deployer from '@web3-citizen/periphery-sol/abis/contracts/Deployer.sol/Deployer.json';

export function useDeployerRead(
  address: string,
  method: string,
  args: any[]
): any {
  return useContractRead(
    {
      addressOrName: address,
      contractInterface: Deployer,
    },
    method,
    {
      args: args,
    }
  );
}

export default useDeployerRead;
