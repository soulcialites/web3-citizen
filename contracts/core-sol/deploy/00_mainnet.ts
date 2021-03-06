import { utils } from "ethers";
import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async function deployContracts(hardhat: HardhatRuntimeEnvironment) {
  if (process.env.DEPLOY == "mainnet") {
    const { deployments, getNamedAccounts } = hardhat;

    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

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
      skipIfAlreadyDeployed: true,
      log: true,
    });

    const Metadata = await deploy("Metadata", {
      contract: "Metadata",
      from: deployer,
      args: [SVGRender.address],
      skipIfAlreadyDeployed: true,
      log: true,
    });

    const CitizenAlpha = await deploy("CitizenAlpha", {
      contract: "CitizenAlpha",
      from: deployer,
      args: [Metadata.address, "Web3Citizen", "CIV"],
      skipIfAlreadyDeployed: true,
      log: true,
    });

    const Notary = await deploy("Notary", {
      contract: "Notary",
      from: deployer,
      args: [CitizenAlpha.address, [deployer]],
      skipIfAlreadyDeployed: true,
      log: true,
    });

    // await deploy("Nation", {
    //   contract: "Nation",
    //   from: deployer,
    //   args: [CitizenAlpha.address, [deployer]],
    //   skipIfAlreadyDeployed: true,
    //   log: true,
    // });

    const NotaryServiceDelegatable = await deploy("NotaryServiceDelegatable", {
      contract: "NotaryServiceDelegatable",
      from: deployer,
      args: [CitizenAlpha.address],
      skipIfAlreadyDeployed: true,
      log: true,
    });

    const SourceENS = await deploy("SourceENS", {
      contract: "SourceENS",
      from: deployer,
      args: [],
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

    const citizenAlpha = await ethers.getContractAt("CitizenAlpha", CitizenAlpha.address);
    const metadata = await ethers.getContractAt("Metadata", Metadata.address);
    const notary = await ethers.getContractAt("Notary", Notary.address);
    const notaryService = await ethers.getContractAt("Notary", Notary.address);

    // await metadata.appendSource(SourceENS.address);
    // await metadata.setToken(CitizenAlpha.address);
    // await citizenAlpha.setNotary(notary.address);

    await notary.grantRole(
      utils.keccak256(utils.toUtf8Bytes("NOTARY")),
      NotaryServiceDelegatable.address
    );
  }
}
