const hre = require("hardhat");

// Used for Ethers BigNumber
const { ethers } = require("hardhat");

async function main() {
          
    [admin] = await ethers.getSigners();
    
    // Mainnet Deployment
    const usdtAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'; // USDT Token Address on Mainnet

    const RDAsset = await ethers.getContractFactory("RDAsset", admin);
    const rdAsset = await RDAsset.deploy(ethers.utils.parseEther("1750000"), usdtAddress); // Convert from wei to ether. Update the value based on the price of the investment property

    // Output for Reference
    console.log("RDAsset deployed to contract address:", rdAsset.address, "by", admin.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});