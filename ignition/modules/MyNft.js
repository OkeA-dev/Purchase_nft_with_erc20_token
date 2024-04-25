const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules');
const fs = require('fs');

async function main() {
  const contractSource = fs.readFileSync('contracts/MyNFT.sol', 'utf8');

  const contractModule = {
    id: 'MyNFTModule',
    source: contractSource,
    solcVersion: '0.8.24',
  };
  
  //Build the contract modules
  const contract = await buildModule(contractModule);

  const deployedContract = await contract.deploy({ args: [] });
  console.log('Contract deployed at:', deployedContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });