import { HardhatUserConfig } from 'hardhat/config';
import { HardhatNetworkAccountUserConfig } from 'hardhat/types';

// Accounts
const TESTNET_PK_DEPLOYER = process.env.TESTNET_PK_DEPLOYER || '';
const MAINNET_PK_DEPLOYER = process.env.MAINNET_PK_DEPLOYER || '';

// Json RPC Endpoints
const ARCHIVE_NODE_RPC_URL = process.env.ARCHIVE_NODE_RPC_URL;
const ETHEREUM_MAINNET_RPC_URL = process.env.ETHEREUM_MAINNET_RPC_URL;
const ETHEREUM_GOERLI_RPC_URL = process.env.ETHEREUM_GOERLI_RPC_URL;

// Forking
const FORK_ENABLED = process.env.FORK_ENABLED;
const FORK_BLOCK_NUMBER = process.env.FORK_BLOCK_NUMBER;

const networks: HardhatUserConfig['networks'] = {
  coverage: {
    url: 'http://127.0.0.1:8555',
    blockGasLimit: 200000000,
    allowUnlimitedContractSize: true,
  },
  localhost: {
    chainId: 1,
    url: 'http://127.0.0.1:8545',
    allowUnlimitedContractSize: true,
  },
  ganache: {
    chainId: 1337,
    url: 'http://127.0.0.1:8545',
  },
};

if (MAINNET_PK_DEPLOYER) {
  networks.mainnet = {
    url: ETHEREUM_MAINNET_RPC_URL,
    gasPrice: 57000000000,
    accounts: [MAINNET_PK_DEPLOYER as unknown as HardhatNetworkAccountUserConfig],
  };
}

if (TESTNET_PK_DEPLOYER) {
  networks.goerli = {
    url: ETHEREUM_GOERLI_RPC_URL,
    accounts: [TESTNET_PK_DEPLOYER as unknown as HardhatNetworkAccountUserConfig],
  };
}

if (ARCHIVE_NODE_RPC_URL && FORK_ENABLED) {
  console.log('Forking Ethereum Mainnet');
  networks.hardhat = {
    chainId: 1,
    hardfork: 'istanbul',
    gasPrice: 15000000000,
    blockGasLimit: 20000000,
    // @ts-ignore
    accounts: [{ privateKey: MAINNET_PK_DEPLOYER, balance: '1615793800000000000' }],
    forking: {
      url: ARCHIVE_NODE_RPC_URL,
      // blockNumber: Number(FORK_BLOCK_NUMBER) || 0,
      blockNumber: 15173654 || 0,
    },
  };
} else {
  networks.hardhat = {
    allowUnlimitedContractSize: true,
  };
}

export default networks;
