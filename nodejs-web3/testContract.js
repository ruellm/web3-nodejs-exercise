// deploy the contract usign truffle migrates
// test calculator contract
var contractABI = [
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getResult",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "num",
          "type": "uint256"
        }
      ],
      "name": "addToNumber",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "num",
          "type": "uint256"
        }
      ],
      "name": "substractFromNumber",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "num",
          "type": "uint256"
        }
      ],
      "name": "multiplyWithNumber",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "num",
          "type": "uint256"
        }
      ],
      "name": "divideNumberBy",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "double",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "half",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getMultipleResult",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        },
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    }
];

const contractAddres = "0x47DbF59fCe6E7FBa8493894dC25314770e65d02b";

const Web3 = require("web3");

var web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'));

 // Set the connect status on the app
 if (web3 /*&& web3.isConnected()*/) {
    console.log("connnected");
} else {
    console.log("unable to connenct to local node");
}
var calculator = new web3.eth.Contract(contractABI, contractAddres);

async function startApp()
{
      let result = await calculator.methods.getResult().call();
      console.log(result);

      const accout = "0xe1e4c3584FF0317390Aefe83114A5e7b1D7fD7c4";  // taken from ganache
      await calculator.methods.addToNumber(10).send({from: accout});
      
      result = await calculator.methods.getResult().call();
      console.log(result);
      
}

/*
// --> this one works
var calculator = new web3.eth.Contract(contractABI, contractAddres);
calculator.methods.getResult().call((err, result) => {
    console.log(result)
});
*/

startApp();
