require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("dotenv").config();
require("hardhat-gas-reporter");
require("solidity-coverage");

const sepolia_url = process.env.RPC_URL;
const private_key = process.env.PRIVATE_KEY;
const coincap_api = process.env.COINKEY_API;
const apikeys = process.env.API_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    // solidity: "0.8.8",
    solidity: {
        compilers: [
            {
                version: "0.8.8",
            },
            { version: "0.6.6" },
        ],
    },
    // defaultNetwork: "hardhat",
    networks: {
        sepolia: {
            url: sepolia_url,
            accounts: [private_key],
            chainId: 11155111,
            blockConfirmations: 6,
        },
    },
    etherscan: {
        apiKey: apikeys,
    },
    gasreporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        // coinmarketcap: coincap_api,
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
};
