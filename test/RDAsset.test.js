const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RDAsset", function () {

    // Test Validation Variables
    let shareName = "Rent Digital Asset 1";
    let shareSymbol = "RDA1";
    let totalShares = 1750000;
    let totalUSDT = 2000000
    const provider = waffle.provider;

    beforeEach(async function () {

        // Get array of addresses from Signers
        [assetOwner, payer, Jane, Dave, renterBob] = await ethers.getSigners();

        // Get Contract Factory and set the assetOwner as the address deploying the contract
        RDAsset = await ethers.getContractFactory("RDAsset", assetOwner);
        USDT = await ethers.getContractFactory("USDT", payer);
        
        // Deploy Smart Contracts
        usdt = await USDT.deploy(totalUSDT);
        rdAsset = await RDAsset.deploy(totalShares, usdt.address);

        // Must do this otherwise the transfers of USDT into Bank do not work
        await usdt.connect(assetOwner).approve(rdAsset.address, 2000000);
        await usdt.connect(Jane).approve(rdAsset.address, 2000000);
        await usdt.connect(Dave).approve(rdAsset.address, 2000000);
        await usdt.connect(renterBob).approve(rdAsset.address, 2000000);
        
        // Asset Owner transfers 500,000 USDT to each person
        usdt.connect(payer).transfer(assetOwner.address, 500000);
        usdt.connect(payer).transfer(Jane.address, 500000);
        usdt.connect(payer).transfer(Dave.address, 500000);
        usdt.connect(payer).transfer(renterBob.address, 500000);

        // Converts string to Bytes32
        USDT = ethers.utils.formatBytes32String('USDT');
    });

    ////////////////////////
    // Happy Path Testing //
    ////////////////////////
    describe("Happy Path", function () {

        describe("Deployment", function () {
        
            it("RD Asset: Token name is correct", async function () {
                
                const result = await rdAsset.name();
                expect(await result).to.equal(shareName);
            });

            it("RD Asset: Token symbol is correct", async function () {
                
                const result = await rdAsset.symbol();
                expect(await result).to.equal(shareSymbol);
            });

            it("RD Asset: Token shares are correct", async function () {
                
                expect(await rdAsset.totalSupply()).to.equal(totalShares);
            });

            it("RD Asset: Initial contract balance should be 0", async function () {
                
                expect(await provider.getBalance(rdAsset.address)).to.equal(0);
            });

            it("RD Asset: Contract owner should have all the shares", async function () {
                
                expect(await rdAsset.balanceOf(assetOwner.address)).to.equal(totalShares);
            });

            it("USDT: Token shares are correct", async function () {
                
                expect(await usdt.totalSupply()).to.equal(totalUSDT);
            });

            it("USDT: USDT contract owner transfers tokens to Jane, Dave and renterBob", async function () {
                
                expect(await usdt.balanceOf(Jane.address)).to.equal(500000);
                expect(await usdt.balanceOf(Dave.address)).to.equal(500000);
                expect(await usdt.balanceOf(renterBob.address)).to.equal(500000);
            });
        });

        describe("Renter", function () {
            
            it("Can deposit rent and get rental balances for selected account", async function () {
                
                await rdAsset.connect(renterBob).depositRent(1500);
                
                expect(await rdAsset.connect(renterBob).getRentalBalance()).to.equal(1500);
            });
            
            it("Can update and track total rental income ", async function () {
        
                await rdAsset.connect(renterBob).depositRent(500);
                await rdAsset.connect(renterBob).depositRent(500);
                
                expect(await rdAsset.totalRentalIncome()).to.equal(1000);
            });

            it("Can assign proceeds to shareholders and get there Shareholder Total Proceeds Gained", async function () {
                
                // Setup Shareholders
                expect(await rdAsset.connect(Jane).getShareBalance()).to.equal(0);
                await rdAsset.connect(Jane).purchaseShares(500000);
                expect(await rdAsset.connect(Jane).getShareBalance()).to.equal(500000);
                
                expect(await rdAsset.connect(Dave).getShareBalance()).to.equal(0);
                await rdAsset.connect(Dave).purchaseShares(400000);
                expect(await rdAsset.connect(Dave).getShareBalance()).to.equal(400000);
                
                // Deposit rent and assign proceeds
                await rdAsset.connect(renterBob).depositRent(1000);
                expect(await rdAsset.connect(renterBob).getRentalBalance()).to.equal(1000);
                
                // Validate Shareholder Total Proceeds Gained
                expect(await rdAsset.connect(Jane).getShareholderTotalProceedsGained()).to.equal(285);
                expect(await rdAsset.connect(Dave).getShareholderTotalProceedsGained()).to.equal(228);
            });
        });
        
        describe("Shareholder", function () {
        
            it("Purchase Shares: Can deposit USDT and get share balance for selected account", async function () {
                
                await rdAsset.connect(Jane).purchaseShares(700);
                await rdAsset.connect(Jane).purchaseShares(700);
                
                expect(await rdAsset.connect(Jane).getShareBalance()).to.equal(1400);
            });
            
            it("Can get the total shares purchased ", async function () {
                
                await rdAsset.connect(Jane).purchaseShares(1000);
                await rdAsset.connect(Jane).purchaseShares(1000);
                await rdAsset.connect(Jane).purchaseShares(1000);
        
                expect(await rdAsset.totalSharesPurchased()).to.equal(3000);
            });

            it("Sell Shares: Can sell shares and get USDT returned", async function () {
                
                expect(await usdt.balanceOf(rdAsset.address)).to.equal(0);
                expect(await usdt.balanceOf(Jane.address)).to.equal(500000);
                expect(await usdt.balanceOf(assetOwner.address)).to.equal(500000);
                
                await rdAsset.purchaseShares(2000);

                expect(await usdt.balanceOf(rdAsset.address)).to.equal(2000);
                expect(await usdt.balanceOf(assetOwner.address)).to.equal(498000);
                
                await rdAsset.sellShares(1000);
                
                expect(await usdt.balanceOf(rdAsset.address)).to.equal(1000);
                expect(await usdt.balanceOf(assetOwner.address)).to.equal(499000);
                
            });
            it("Withdraw Proceeds: Can withdraw proceeds and get USDT returned", async function () {
                
                expect(await usdt.balanceOf(rdAsset.address)).to.equal(0);
                expect(await usdt.balanceOf(Jane.address)).to.equal(500000);
                expect(await usdt.balanceOf(assetOwner.address)).to.equal(500000);
                
                await rdAsset.purchaseShares(200000);

                expect(await usdt.balanceOf(rdAsset.address)).to.equal(200000);
                expect(await usdt.balanceOf(assetOwner.address)).to.equal(300000);

                await rdAsset.connect(Jane).depositRent(1000);

                expect(await rdAsset.getShareholderTotalProceedsGained()).to.equal(114);

                await rdAsset.withdrawProceeds();
                
                expect(await usdt.balanceOf(assetOwner.address)).to.equal(300114);
            });
        });
    });

    ///////////////////////////
    // Un-Happy Path Testing //
    ///////////////////////////
    describe("Un-Happy Path", function () {

        describe("Shareholder", function () {
        
            it("Validate: You do not have enough shares to sell selected amount", async function () {
                
                await rdAsset.connect(Jane).purchaseShares(500);

                // The error message must match the error message from the smart contract function require text
                await expect(rdAsset.connect(Jane).sellShares(1000)).to.be.revertedWith("You do not have enough shares to sell selected amount");

            });

            it("sellShares: If not a shareholder then you can not sell shares", async function () {
                
                await expect(rdAsset.connect(Jane).sellShares(1000)).to.be.revertedWith("You are not a shareholder");
                
            });

            it("WithdrawProcceds: You are not a shareholder", async function () {
                
                await expect(rdAsset.connect(Jane).withdrawProceeds()).to.be.revertedWith("You are not a shareholder");
            });

            it("WithdrawProcceds: You do not have any proceeds to withdraw", async function () {
                
                await rdAsset.connect(Jane).purchaseShares(2000);

                await expect(rdAsset.connect(Jane).withdrawProceeds()).to.be.revertedWith("You do not have any proceeds to withdraw");
            });
        });
    });
});