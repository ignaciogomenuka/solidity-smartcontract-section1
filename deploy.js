const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile'); // import interface and bytecode from compile.js


const provider = new HDWalletProvider(
    // Dummy wallet for testnets, you are not going to find any money here xD
    'bus tilt cruise athlete mountain fatal abstract rough dinner neutral usage say',
    'https://sepolia.infura.io/v3/c546504acba14d7daaf1e4459de9a488'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    //use one of those accounts to deploy the contract
    //the contract
    console.log ('Attempting to deploy from account', accounts[0]);


   const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode,
            arguments: ['Hi there!']
        })
        .send({ from: accounts[0], gas: '1000000' });

    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};
deploy (); 
