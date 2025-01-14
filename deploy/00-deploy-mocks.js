const { network } = require("hardhat");
const {
    developmentchain,
    DECIMALS,
    INITIAL_ANSWER,
} = require("../helper-hardhat-config");
const { Contract } = require("ethers");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    // const chainId = network.config.chainId;

    if (developmentchain.includes(network.name)) {
        log("local network detected deploying mock...");
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        });

        log("mocks deployed");
        log("--------------------------------------------");
    }
};

module.exports.tags = ["all", "mocks"];
