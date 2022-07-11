import TokenA from "@web3-citizen/core-sol/deployments/mainnet/TokenA.json";
import TokenB from "@web3-citizen/core-sol/deployments/mainnet/TokenB.json";

function useGetTokenOptions() {
  const optionsTokens = [
    { value: TokenA.address, label: "Token A" },
    { value: TokenB.address, label: "Token B" },
  ];

  return optionsTokens;
}

export default useGetTokenOptions;
