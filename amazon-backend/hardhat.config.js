require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

require('dotenv').config();

const { RPC_URL, PRIVATE_KEY } = process.env; 
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "volta",
   networks: {
      hardhat: {
         chainId: 1337
      },
      volta: {
         url: RPC_URL,
         accounts: [`0x${PRIVATE_KEY}`],
         gas: 210000000,
         gasPrice: 800000000000,
      }
   },
  
};
