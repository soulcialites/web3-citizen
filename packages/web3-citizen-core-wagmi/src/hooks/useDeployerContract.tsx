import { useContract } from 'wagmi';
import Deployer from '@web3-citizen/periphery-sol/abis/contracts/Deployer.sol/Deployer.json';


export function useDeployerContract(
  address: string,
): any {
  return useContract(
    {
      addressOrName: address,
      contractInterface: Deployer,
    },
  );
}

export default useDeployerContract;
