const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { assert, expect } = require("chai");

describe("FundMe", function () {
    let fundme;
    let deployer;
    let mockV3Aggregator;

    const sendvalue = ethers.parseEther("1");
    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(["all"]);

        const fundMeDeployment = await deployments.get("FundMe");
        console.log("FundMe address:", fundMeDeployment.address);

        fundme = await ethers.getContractAt("FundMe", deployer);
        mockV3Aggregator = await ethers.getContractAt(
            "MockV3Aggregator",
            deployer
        );

        console.log("Deployer address:", deployer);
        const mockaddress = await mockV3Aggregator.getAddress();
        console.log("mock address:", mockaddress);
    });
    describe("constructor", function () {
        it("sets the aggregator address correctly", async function () {
            const response = await fundme.address;

            console.log("fundme address:", response);
            assert.equal(response, mockV3Aggregator.address);
        });
    });

    describe("fund", function () {
        it("fails if you dont send enough eth", async function () {
            expect(fundme.fund()).to.be.revertedWith(
                "You need to spend more ETH"
            );
        });
        // it("it update the amount funded data structure", async function () {
        //     const txResponse = await fundme.fund({ value: sendvalue });
        //     const txReceipt = await txResponse.wait();

        //     const response = await fundme.getAddressToAmountFunded(deployer);
        //     assert.equal(response.toString(), sendvalue.toString());
        // });

        // it("add funder to array of funders", async function () {
        //     await fundme.fund({ value: sendvalue });
        //     const funder = await fundme.getFunder(0);
        //     assert.equal(funder, deployer);
        // });
    });
    // describe("withdrawl", async function () {
    //     beforeEach(async function () {
    //         await fundme.fund({ value: sendvalue });
    //     });

    //     it("withdraw ETH from a single funder", async function () {
    //         const startingfundmebalance = await ethers.provider.getBalance(
    //             fundme.getAddress()
    //         );
    //         const startingdeployerbalance = await ethers.provider.getBalance(
    //             deployer
    //         );

    //         const response = await fundme.withdraw();
    //         const reciept = await response.wait(1);

    //         const { gasUsed, effectiveGasPrice } = reciept;
    //         const gasCost = gasUsed.mul(effectiveGasPrice);

    //         const endingfundmebalance = await ethers.provider.getBalance(
    //             fundme.getAddress()
    //         );
    //         const endingdeployerbalance = await ethers.provider.getBalance(
    //             deployer
    //         );

    //         assert.equal(endingfundmebalance, 0);
    //         assert.equal(
    //             startingfundmebalance.add(startingdeployerbalance).toString(),
    //             endingdeployerbalance.add(gasCost).toString()
    //         );
    //     });
    // });
});
