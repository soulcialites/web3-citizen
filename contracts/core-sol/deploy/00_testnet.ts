import { utils } from "ethers";
import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async function deployContracts(hardhat: HardhatRuntimeEnvironment) {
  if (process.env.DEPLOY == "testnet") {
    const { deployments, getNamedAccounts } = hardhat;

    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const kames = "0xfc4099eF10CC6255E8662eF85CF82067A7f2e3fd";
    const tjark = "0x9f36a6bb398118bdcd5b1bc3343d8feb6d7d02b9";
    const mcoso = "0xd095e0f8c72e22319846b643c4bac0cac1f67006";

    const svgColor = await deploy("SVGColor", {
      contract: "SVGColor",
      from: deployer,
      args: [],
      skipIfAlreadyDeployed: true,
      log: true,
    });

    const SVGRender = await deploy("SVGRender", {
      contract: "SVGRender",
      from: deployer,
      args: [svgColor.address],
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
      args: [CitizenAlpha.address, [kames, deployer]],
      skipIfAlreadyDeployed: false,
      log: true,
    });

    const Nation = await deploy("Nation", {
      contract: "Nation",
      from: deployer,
      args: [CitizenAlpha.address, [kames, deployer]],
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

    const SourceENS = await deploy("SourceENS", {
      contract: "SourceENS",
      from: deployer,
      args: [],
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
    const metadata = await ethers.getContractAt("Metadata", Metadata.address);
    const notary = await ethers.getContractAt("Notary", Notary.address);
    const notaryServiceDelegatable = await ethers.getContractAt(
      "NotaryServiceDelegatable",
      NotaryServiceDelegatable.address
    );

    await citizenAlpha.setNotary(notary.address);
    await metadata.appendSource(SourceENS.address);
    await metadata.setToken(CitizenAlpha.address);
    await notaryServiceDelegatable.transferOwnership(kames);

    await notary.grantRole(
      utils.keccak256(utils.toUtf8Bytes("NOTARY")),
      NotaryServiceDelegatable.address
    );
    await notary.issue(kames);
  }
}
