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

  describe("Balance ", function () {
    it("should assign the total supply to the owner", async function () {
      const { token, owner } = await loadFixture(deployTokenFixture);
      const ownerBalance = await token.balanceOf(owner.address);

      expect(await token.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transfer", function () {
    it("should transfer to between account", async function () {
      const { token, owner, recipient} = await loadFixture(deployTokenFixture);
      await token.transfer(recipient.address, 100);

      expect(await token.balanceOf(recipient.address)).to.equal(100);
    });

    it("should fail if the sender doesn't have enough tokens", async function () {
      const { token, owner, recipient} = await loadFixture(deployTokenFixture);
      await expect(token.connect(recipient).transfer(owner.address, 1)).to.be.revertedWith("ERC20: transfer amount exceeds balance");
    })
  })
 
});