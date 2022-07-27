const hre = require("hardhat");

// Used for Ethers BigNumber
const { ethers } = require("hardhat");

async function main() {
          
    // Testnet Deployment
    const Usdt = await ethers.getContractFactory("USDT");
    const usdt = await Usdt.deploy(ethers.utils.parseEther("2000000")); // Convert from wei to ether.

    const RDAsset = await ethers.getContractFactory("RDAsset");
    const rdAsset = await RDAsset.deploy(ethers.utils.parseEther("1750000"), usdt.address); // Convert from wei to ether. Update the value based on the price of the investment property

    // Output for Reference
    console.log("RDAsset deployed to contract address:", rdAsset.address);
    console.log("Moch Tether deployed to contract address:", usdt.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});