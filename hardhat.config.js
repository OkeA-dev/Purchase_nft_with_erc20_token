require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

task("deploy-erc20", "Deploy the ERC20 token contract")
  .setAction(async (_, { ethers }) => {
    const ERC20Module = await ethers.getContractFactory("MyToken");
    const erc20Token = await ERC20Module.deploy();
    await erc20Token.deployed();

    console.log("ERC20 token deployed to:", erc20Token.address);
  });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.SEPOLIA_URL}`,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
}