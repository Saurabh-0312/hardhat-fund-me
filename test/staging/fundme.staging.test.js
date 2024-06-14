// test are not running giving some unknown errors

const { getNamedAccounts, ethers } = require("hardhat");
const { developmentchains } = require("../../helper-hardhat-config");
const {
    isCallTrace,
} = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

const { assert } = require("chai");
developmentchains.include(network.name)
    ? describe.skip
    : describe("fundme", async function () {
          let fundme;
          let deployer;
          const sendvalue = ethers.parseEther("1");
          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer;
              fundme = await ethers.getContractAt("fundme", deployer);
          });

          isCallTrace("allow people to fund and withdraw", async function () {
              await fundme.fund({ value: sendvalue });
              await fundme.waithdraw();
              const endingbalance = await fundme.provider.getBalance(
                  fundme.address
              );
              assert.equal(endingbalance.toString(), "0");
          });
      });
