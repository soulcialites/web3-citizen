import { utils } from "ethers";
import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async function deployContracts(hardhat: HardhatRuntimeEnvironment) {
  if (process.env.DEPLOY == "mainnet") {
    const { deployments, getNamedAccounts } = hardhat;

    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const kames = "0xfc4099eF10CC6255E8662eF85CF82067A7f2e3fd";
    const tjark = "0x9f36a6bb398118bdcd5b1bc3343d8feb6d7d02b9";

    const svgColor = await deploy("SVGColor", {
      contract: "SVGColor",
      from: deployer,
      args: [],
      skipIfAlreadyDeployed: false,
      log: true,
    });
    
    const SVGRender = await deploy("SVGRender", {
      contract: "SVGRender",
      from: deployer,
      args: [svgColor.address],
      skipIfAlreadyDeployed: false,
      log: true,
    });

    const DataENS = await deploy("DataENS", {
      contract: "DataENS",
      from: deployer,
      args: [],
      skipIfAlreadyDeployed: false,
      log: true,
    });

    const Metadata = await deploy("Metadata", {
      contract: "Metadata",
      from: deployer,
      args: [SVGRender.address],
      skipIfAlreadyDeployed: false,
      log: true,
    });

    const CitizenAlpha = await deploy("CitizenAlpha", {
      contract: "CitizenAlpha",
      from: deployer,
      args: [Metadata.address, "Web3Citizen", "CIV"],
      skipIfAlreadyDeployed: false,
      log: true,
    });

    const Notary = await deploy("Notary", {
      contract: "Notary",
      from: deployer,
      args: [CitizenAlpha.address, [kames, tjark]],
      skipIfAlreadyDeployed: false,
      log: true,
    });

    await deploy("Nation", {
      contract: "Nation",
      from: deployer,
      args: [CitizenAlpha.address, [kames]],
      skipIfAlreadyDeployed: false,
      log: true,
    });

    const NotaryServiceDelegatable = await deploy("NotaryServiceDelegatable", {
      contract: "NotaryServiceDelegatable",
      from: deployer,
      args: [Notary.address],
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
    const citizenMetadata = await ethers.getContractAt("Metadata", Metadata.address);
    const citizenNotary = await ethers.getContractAt("Notary", Notary.address);
    const notaryServiceDelegatable = await ethers.getContractAt(
      "NotaryServiceDelegatable",
      NotaryServiceDelegatable.address
    );

    await citizenMetadata.appendSource(DataENS.address);
    await citizenMetadata.setToken(CitizenAlpha.address);
    await citizenAlpha.setNotary(citizenNotary.address);

    await citizenNotary.grantRole(
      utils.keccak256(utils.toUtf8Bytes("NOTARY")),
      NotaryServiceDelegatable.address
    );
    await notaryServiceDelegatable.transferOwnership(kames);
  }
}
