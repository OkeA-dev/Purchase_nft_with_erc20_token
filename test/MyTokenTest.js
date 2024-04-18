const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("MyToken", function() {
  async function deployTokenFixture() {
    const [owner, recipient, spender, attacker] = await ethers.getSigners();
    const INITIAL_SUPPLY = 1000000;

    const MyToken = await ethers.getContractFactory("MyToken");
    console.log("Deploying contract...");

    const token = await MyToken.deploy("Iconart Token", "ICT", INITIAL_SUPPLY);
    console.log("Waiting for contract deployment....");

    await token.waitForDeployment();

    return { token, owner, recipient, spender , attacker};
  }

  describe("Balance and Transfer", function () {
    it("should assign the total supply to the owner", async function () {
      const { token, owner } = await loadFixture(deployTokenFixture);
      const ownerBalance = await token.balanceOf(owner.address);

      expect(await token.totalSupply()).to.equal(ownerBalance);
    });
  });
 
});