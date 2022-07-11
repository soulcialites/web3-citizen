import '@nomiclabs/hardhat-etherscan';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import 'hardhat-dependency-compiler';
import 'hardhat-abi-exporter';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import { HardhatUserConfig, task } from 'hardhat/config';
import networks from './hardhat.network';
import impersonateAddress from './scripts/impersonateAddress';

const optimizerEnabled = !process.env.OPTIMIZER_DISABLED;
const foundryEnabled = process.env.FOUNDRY_ENABLED;

/**
 * The Foundry integration is a new experimental feature.
 * Not all of the bugs have been fixed yet for usage in a monorepo.
 * Only enabled when the environment variable FOUNDRY_ENABLED is set to true.
 */
if (foundryEnabled) {
  require('@foundry-rs/hardhat');
  require('@foundry-rs/hardhat-anvil');
  require('@foundry-rs/hardhat-forge');
}

task('fork:setup', 'Initialize Fork Environment').setAction(async (_args, { ethers }) => {
  try {
    const signer = await impersonateAddress('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', ethers);
    console.log(await signer.getBalance());
  } catch (error) {
    console.log(error);
  }
});

const config: HardhatUserConfig = {
  abiExporter: {
    path: './abis',
    runOnCompile: true,
    clear: true,
    flat: false,
    except: ['./abis/ERC20.sol', './abis/ERC721.sol'],
  },
  // @ts-ignore
  anvil: {
    url: 'http://127.0.0.1:8545/',
    launch: false, // if set to `true`, it will spawn a new instance if the plugin is initialized, if set to `false` it expects an already running anvil instance
  },
  typechain: {
    outDir: 'types',
    target: 'ethers-v5',
  },
  external: {
    contracts: [
      {
        artifacts:
          '@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol:IERC721Enumerable',
      },
    ],
  },
  dependencyCompiler: {
    paths: [],
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 100,
    enabled: process.env.REPORT_GAS ? true : false,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    maxMethodDiff: 10,
  },
  mocha: {
    timeout: 30000,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  networks,
  solidity: {
    version: '0.8.15',
    settings: {
      optimizer: {
        enabled: optimizerEnabled,
        runs: 200,
      },
      evmVersion: 'istanbul',
    },
  },
};

export default config;
