export const impersonateAddress = async (address: string, ethers: any) => {
  const hre = require("hardhat");
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [address],
  });
  console.log(ethers);
  const signer = await ethers.provider.getSigner(address);
  signer.address = signer._address;
  return signer;
};

export default impersonateAddress;
