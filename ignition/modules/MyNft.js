const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules');

//Read the smart contract code
const contractSource = fs.readFileSync('MyNft.sol', 'utf8');

// Compile the contract
const input = {
    language: 'Solidity',
    sources: {
        'MyNFT.sol': {
            content: contractSource
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

const tempFile = JSON.parse(solc.compile(JSON.stringify(input)));
const contractFile = tempFile.contracts['MyNft.sol']['MyNFT'];

//Create an instance of the Web3 library
const web3 = new Web3(`https://eth-sepolia.g.alchemy.com/v2/${process.env.SEPOLIA_URL}`);

// Set up the contract deployment parameter
const bytecode = '0x' + contractFile.evm.bytecode.object;
const abi = contractFile.abi;

//Build the deployment module
const deployModule = buildModule({
    bytecode: bytecode,
    abi: abi,
    gas: 4700000,
    gasPrice: 100000000000
});

//Deploy the contract
web3.eth.sendTransaction({
    from: '0xa324CBeb48D0Dede644eD671D45e78873Ae8127e',
    data: deployModule.data
})
.once('transtionHash', (txHash) => {
    console.log('Transaction hash:', txHash);
})
.once('recipient', (receipt) => {
    console.log('Contract deployed at address:', receipt.contractAddress);

    //Get the deployed contract instance
    const deployedContract = new web3.eth.Contract(abi, receipt.contractAddress);

    console.log('Deployed contract instance:', deployedContract);

})
.on('error', (error) => {
    console.error('Error deploying contract:', error);
})