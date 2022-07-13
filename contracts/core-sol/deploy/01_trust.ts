import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async function deployContracts(hardhat: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hardhat;

  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
}
