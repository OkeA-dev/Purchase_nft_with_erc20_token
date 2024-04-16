const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("ERC20 Token", function () {
  async function deployERC20Token() {
    const [owner, recipient, spender] = await ethers.getSigner();

    const ERC20 = await ethers.getContractFactory("MyToken");
    const token = await ERC20.deploy("Iconart Token", "ICT", 100000);

    return { token, owner, recipient, spender};

  }

  it("should have the correct initial balance", async function () {
    const {token, owner } = await loadFixture(deployERC20Token);
    expect(await token.balanceOf(owner.address)).to.equal(await token.totalSupply());
  });

  it("should the token amount correctly", async function () {
    const [token, owner, recipient] = await loadFixture(deployERC20Token);

    const amount  = 10000;
    await token.transfer(recipient, amount);

    expect(await token.balanceOf(recipient.address)).to.equal(amount);
    expect(await token.balanceOf(owner.address)).to.equal(await token.totalSupply() - amount)
  } )
})