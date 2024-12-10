require("@nomiclabs/hardhat-waffle");
require('dotenv').config({ path: '.env.development.local' });

module.exports = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: "vechain_testnet",
  networks: {
    vechain_testnet: {
      url: process.env.BLOCKCHAIN_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
