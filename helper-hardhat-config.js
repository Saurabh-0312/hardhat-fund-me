const { network } = require("hardhat");

const networkconfig = {
    11155111: {
        name: "sepolia",
        ethusdpricefeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    },
};

const developmentchain = ["hardhat", "localhost"];
const DECIMALS = 8;
const INITIAL_ANSWER = 200000000000;

module.exports = {
    networkconfig,
    developmentchain,
    INITIAL_ANSWER,
    DECIMALS,
};
