const hre = require("hardhat");

// Used for Ethers BigNumber
const { ethers } = require("hardhat");

async function main() {
          
    [assetOwner, Jane, Dave, renterBob] = await ethers.getSigners();
    
    // Localhost/Testnet Deployment
    const Usdt = await ethers.getContractFactory("USDT", assetOwner);
    const usdt = await Usdt.deploy(ethers.utils.parseEther("2000000")); // Convert from wei to ether. Random amount of USDT created

    const RDAsset = await ethers.getContractFactory("RDAsset", assetOwner);
    const rdAsset = await RDAsset.deploy(ethers.utils.parseEther("1750000"), usdt.address); // Convert from wei to ether. Update the value based on the price of the investment property

    // Must do this otherwise the transfers of USDT into RDAsset do not work
    await usdt.connect(assetOwner).approve(rdAsset.address, ethers.utils.parseEther("2000000"));
    await usdt.connect(Jane).approve(rdAsset.address, ethers.utils.parseEther("2000000"));
    await usdt.connect(Dave).approve(rdAsset.address, ethers.utils.parseEther("2000000"));
    await usdt.connect(renterBob).approve(rdAsset.address, ethers.utils.parseEther("2000000"));
    
    // Asset Owner transfers 500,000 USDT to each person
    usdt.connect(assetOwner).transfer(Jane.address, ethers.utils.parseEther("500000"));
    usdt.connect(assetOwner).transfer(Dave.address, ethers.utils.parseEther("500000"));
    usdt.connect(assetOwner).transfer(renterBob.address, ethers.utils.parseEther("500000"));

    // Output for Reference
    console.log("RDAsset deployed to contract address::", rdAsset.address, "by", assetOwner.address);
    console.log("Moch Tether deployed to contract address:", usdt.address, "by", assetOwner.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});