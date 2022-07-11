import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async function deployContracts(hardhat: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hardhat;

  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const kames = "0xfc4099eF10CC6255E8662eF85CF82067A7f2e3fd";
  const mcoso = "0xd095e0f8c72e22319846b643c4bac0cac1f67006";
  const jbass = "0x3417ad1d79d9508912e8d7f3b9167085500b12ce";

  const svgColor = await deploy("SVGColor", {
    contract: "SVGColor",
    from: deployer,
    args: [],
    skipIfAlreadyDeployed: true,
    log: true,
  });

  const CitizenAlphaMetadata = await deploy("CitizenAlphaMetadata", {
    contract: "CitizenAlphaMetadata",
    from: deployer,
    args: [svgColor.address],
    skipIfAlreadyDeployed: true,
    log: true,
  });

  const CitizenAlpha = await deploy("CitizenAlpha", {
    contract: "CitizenAlpha",
    from: deployer,
    args: [CitizenAlphaMetadata.address, [kames]],
    skipIfAlreadyDeployed: true,
    log: true,
  });

  await deploy("TrustToken", {
    contract: "TrustToken",
    from: deployer,
    args: [CitizenAlpha.address, "Public Goods Protocol", "PGP.alpha"],
    skipIfAlreadyDeployed: true,
    log: true,
  });

  const citizenAlphaMetadata = await ethers.getContractAt(
    "CitizenAlphaMetadata",
    CitizenAlphaMetadata.address
  );

  await citizenAlphaMetadata.setToken(CitizenAlpha.address);
}
