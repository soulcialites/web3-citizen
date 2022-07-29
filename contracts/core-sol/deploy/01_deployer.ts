import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async function deployContracts(hardhat: HardhatRuntimeEnvironment) {
  if (process.env.DEPLOY == "deployer") {
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

    await deploy("Deployer", {
      contract: "Deployer",
      from: deployer,
      args: [SVGRender.address],
      skipIfAlreadyDeployed: true,
      log: true,
    });

  }
}
