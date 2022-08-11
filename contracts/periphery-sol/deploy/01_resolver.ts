
import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async function deployContracts(hardhat: HardhatRuntimeEnvironment) {
  if (process.env.DEPLOY == "testnet") {
    const { deployments, getNamedAccounts, ethers } = hardhat;

    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const Deployer = await deployments.get("Deployer");
``
    await deploy("TrustResolver3", {
      contract: "TrustResolver3",
      from: deployer,
      args: [Deployer.address],
      skipIfAlreadyDeployed: false,
      log: true,
    });

  }
}
