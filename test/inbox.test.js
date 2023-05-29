const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // Web3 is a constructor function, so we use capital W
const web3 = new Web3(ganache.provider()); // instance of Web3 to connect to our local test network
const { interface, bytecode } = require('../compile'); // import interface and bytecode from compile.js

/*
Large comment block due to avoiding duplicate contract deployment
    class Car {
    park() {
        return 'stopped';
    }

    drive() {
        return 'vroom';
    }
}

let car; // declare car variable outside of beforeEach() so it can be accessed by all it() functions
let accounts; // declare accounts variable outside of beforeEach() so it can be accessed by all it() functions

beforeEach(() => {
    const car = new Car();
});

describe('Car', () => { // describe() is a global function
    it('can park', () => {
        const car = new Car();  // create a new instance of Car
        assert.equal(car.park(), 'stopped'); // assert.equal(actual, expected)
    });

    it('can drive', () => {
        const car = new Car(); // create a new instance of Car
        assert.equal(car.drive(), 'vroom'); // assert.equal(actual, expected)
    });
}
);
*/

let accounts;
let inbox;

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();


//use one of those accounts to deploy the contract
//the contract
inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ from: accounts[0], gas: '1000000' });
});


describe('Inbox', () => {
    it ('deploys a contract', () => {
        assert.ok(inbox.options.address); // assert.ok checks if value is defined or not  
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call(); // call() is used to read data from the blockchain
        assert.equal(message, 'Hi there!');
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('bye').send({ from: accounts[0] }); // send() is used to modify data in the blockchain
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye');
    });
});


