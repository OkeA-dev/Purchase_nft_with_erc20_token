const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const INITIAL_SUPPLY = 1000000;

module.exports = buildModule("ERC20Module", (m) => {
  const token = m.contract("MyToken", ["ICONART Token", "ICT", INITIAL_SUPPLY], {
    initialSupply: INITIAL_SUPPLY,
  });

  return { token };
});


