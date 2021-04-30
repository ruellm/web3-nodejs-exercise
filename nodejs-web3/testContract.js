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
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "responsible",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "result",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "adder",
        "type": "uint256"
      }
    ],
    "name": "NumberAdded",
    "type": "event"
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

const contractAddres = "0xF50944D21389Ec40BC7B00256144E75567D29b04";

const Web3 = require("web3");

//HTTP provider does not support listening to events
//var web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'));
var web3 = new Web3(new Web3.providers.WebsocketProvider('ws://127.0.0.1:7545'));

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
      
      calculator.events.NumberAdded().on("data", function(event){
          let r = event.returnValues;
          console.log(" Accout " + r.responsible + " changed the value to " 
          + r.result + " by adding " + r.adder);

      }).on("error", console.error);

      const accout = "0x68a3E2DB9de4b330Bf9E833F7F5AeB589f63ca6c";  // taken from ganache
      await calculator.methods.addToNumber(10).send({from: accout});
      
      result = await calculator.methods.getResult().call();
      console.log(result);

      multResult = await calculator.methods.getMultipleResult().call();
      console.log(multResult);
}

/*
// --> this one works
var calculator = new web3.eth.Contract(contractABI, contractAddres);
calculator.methods.getResult().call((err, result) => {
    console.log(result)
});
*/

startApp();
