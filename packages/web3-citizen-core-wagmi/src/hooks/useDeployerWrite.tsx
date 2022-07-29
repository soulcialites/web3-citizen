import { useContractWrite } from 'wagmi';
import Deployer from '@web3-citizen/periphery-sol/abis/contracts/Deployer.sol/Deployer.json';

export function useDeployerWrite(
  address: string,
  method: string,
  args: any[]
): any {
  return useContractWrite(
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

export default useDeployerWrite;
