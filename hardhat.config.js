require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");

// Used to verify contract
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config()

const {RINKEBY_URL, PRIVATE_KEY} = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.12",

  networks: {
    hardhat: {
      // local hardhat node
    },
    // Rinkeby is being delete soon. Move to Goerli
    rinkeby:{
      // Infura.io endpoint for RentDigital
      //url: process.env.RINKEBY_URL,
      url: "https://rinkeby.infura.io/v3/82e84167bb6c48f1ab79138fadec92f6",
      // Private Key of my test Account: 1 on Rinkeby 
      accounts: ["5f8a72dc15f1ec27c1664ac0d2549d17a30f0a6479cb75ce232d6615261d3ae0"],     

      //url: RINKEBY_URL,
      //accounts: [`0x${PRIVATE_KEY}`]
    },
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,

  }


};
