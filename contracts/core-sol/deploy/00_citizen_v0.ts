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
    skipIfAlreadyDeployed: false,
    log: true,
  });

  const ResolverENS = await deploy("ResolverENS", {
    contract: "ResolverENS",
    from: deployer,
    args: [],
    skipIfAlreadyDeployed: false,
    log: true,
  });

  const CitizenMetadata = await deploy("CitizenMetadata", {
    contract: "CitizenMetadata",
    from: deployer,
    args: [svgColor.address ],
    skipIfAlreadyDeployed: false,
    log: true,
  });
  
  const CitizenAlpha = await deploy("CitizenAlpha", {
    contract: "CitizenAlpha",
    from: deployer,
    args: [CitizenMetadata.address, "Web3Citizen", "CIV"],
    skipIfAlreadyDeployed: false,
    log: true,
  });
  
  const CitizenNotary = await deploy("CitizenNotary", {
    contract: "CitizenNotary",
    from: deployer,
    args: [CitizenAlpha.address, [kames, deployer]],
    skipIfAlreadyDeployed: false,
    log: true,
  });
  
  await deploy("TrustToken", {
    contract: "TrustToken",
    from: deployer,
    args: [CitizenAlpha.address, "Public Goods Protocol", "PGP.alpha"],
    skipIfAlreadyDeployed: false,
    log: true,
  });

  
  const citizenAlpha = await ethers.getContractAt("CitizenAlpha", CitizenAlpha.address);
  const citizenMetadata = await ethers.getContractAt("CitizenMetadata", CitizenMetadata.address);
  const citizenNotary = await ethers.getContractAt("CitizenNotary", CitizenNotary.address);

  await citizenAlpha.setNotary(citizenNotary.address)
  await citizenMetadata.appendSource(ResolverENS.address)
  await citizenMetadata.setToken(CitizenAlpha.address);

  await citizenNotary.issue(kames,);
  await citizenNotary.issue(mcoso);
}
