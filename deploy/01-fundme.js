const { networkconfig, developmentchain } = require("../helper-hardhat-config");
const { network } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;

    // const ethusdpricefeed = networkconfig(chainId)["ethusdpricefeed"];
    let ethusdpricefeedaddress;
    if (developmentchain.includes(network.name)) {
        const ethusdaggregator = await deployments.get("MockV3Aggregator");
        ethusdpricefeedaddress = ethusdaggregator.address;
    } else {
        ethusdpricefeedaddress = networkconfig[chainId]["ethusdpricefeed"];
    }
    const args = [ethusdpricefeedaddress];
    const fundme = await deploy("FundMe", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmation: network.config.blockConfirmations || 1,
    });

    if (!developmentchain.includes(network.name) && process.env.API_KEY) {
        await verify(fundme.address, args);
    }

    log("-------------------------------------");
};

module.exports.tags = ["all", "fundme"];
