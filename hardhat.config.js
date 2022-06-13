require('@openzeppelin/hardhat-upgrades');
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("dotenv").config();


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const REPORT_GAS = process.env.REPORT_GAS || false
const BSCTESTNET_RPC_URL = process.env.BSCTESTNET_RPC_URL || "https://data-seed-prebsc-1-s1.binance.org:8545"
const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY || "Your etherscan API key"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x"

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  // solidity: "0.8.4",
  solidity: {
    compilers: [{
        version: "0.8.7",
      },
    ],
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: { 
      chainId: 1337,
    },
    bsctestnet: {
        url: BSCTESTNET_RPC_URL,
        accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
        saveDeployments: true,
        chainId: 97,
    },
  },
  etherscan: {
    // npx hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
    apiKey: {
      bscTestnet: BSCSCAN_API_KEY,
    },
  },
  gasReporter: {
    enabled: REPORT_GAS,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  contractSizer: {
    runOnCompile: false,
    only: ["Raffle"],
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
    player: {
      default: 1,
    },
  },
  mocha: {
      timeout: 200000, // 200 seconds max for running tests
  },
};
