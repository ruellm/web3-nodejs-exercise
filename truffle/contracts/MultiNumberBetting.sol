pragma solidity >=0.6.0 <0.9.0;

import "./BettingAbstract.sol";
    
contract MultiNumberBetting is BettingAbstract {
    
    struct Winner {
        string  name;
        address winnerAddress;
        uint    guess;
        uint    guessedAt;
        uint    ethersReceived;
    }

    modifier ownerOnly {
         require(msg.sender == owner);
         _;
     }
    
    address  winner;
    address  owner;
    
    mapping(address=>Winner) winnersMapping;
    
    uint8[3]  numArray;
    
    uint public  loserCount;
    uint public  winnerCount;
    uint public   lastWinnerAt;
    
    
    constructor(uint8 num0, uint8 num1, uint8 num2) payable{
        numArray[0] = num0;
        numArray[1] = num1;
        numArray[2] = num2;
        
         owner = msg.sender;
    }
    
    
    function guess(uint8 num, string memory name) public override payable returns (bool){
    
        // If num > 10 revert
        if (num > 10) {
          revert();
        }
        
        // Ex-4, Part-1
        if (msg.value > MAX_BET || msg.value < MIN_BET) {
          revert();
        }
        
        
        for (uint8 i = 0 ; i < numArray.length ; i++){
          if (numArray[i] == num) {
            // Increase the winner count
            winnerCount++;
        
            winnersMapping[msg.sender].winnerAddress = msg.sender;
            winnersMapping[msg.sender].name = name;
            winnersMapping[msg.sender].guess = num;
            winnersMapping[msg.sender].guessedAt = block.timestamp;
            winnersMapping[msg.sender].ethersReceived = msg.value;
        
            lastWinnerAt = winnersMapping[msg.sender].guessedAt;
            winner = msg.sender;
            
            uint sendBack = 2*msg.value;
            msg.sender.transfer(sendBack);
        
            return true;
          }
        }
        loserCount++;
        return false;
    }
    
    function totalGuesses() public view override returns (uint){
        return (loserCount+winnerCount);
    }
    
    function daysSinceLastWinning() public view override  returns (uint){
        return (block.timestamp - lastWinnerAt*1 days);
    }
    
    function hoursSinceLastWinning() public view override returns (uint){
        return (block.timestamp - lastWinnerAt*1 hours);
    }
    
    function  minutesSinceLastWinning() public view override returns (uint){
        return (block.timestamp - lastWinnerAt*1 minutes);
    }
    
    function getLastWinnerInfo() public view override returns (address winnerAddress,
                                         string memory name, 
                                         uint guessNum,
                                         uint    guessedAt,
                                         uint    ethersReceived) {
        winnerAddress = winnersMapping[winner].winnerAddress;
        name = winnersMapping[winner].name;
        guessNum = winnersMapping[winner].guess;
        guessedAt = winnersMapping[winner].guessedAt;
        ethersReceived = winnersMapping[winner].ethersReceived;
    }
    
    function checkWinning(address winnerAddress) public view override returns (address retWinnerAddress, string memory name, uint guessVal, uint guessedAt) {
        Winner memory winnerLocal = winnersMapping[winnerAddress];
        if (winnerLocal.guessedAt != 0) {
            retWinnerAddress = winnerLocal.winnerAddress;
            name = winnerLocal.name;
            guessVal = winnerLocal.guess;
            guessedAt = winnerLocal.guessedAt;
        }
    }
    
    function ownerWithdraw(uint amt) public ownerOnly {
        if ((this.balance - amt) > 3*MAX_BET) {
          msg.sender.transfer(amt);
        } else {
          revert();
        }
    }
    

    fallback() public payable {
        //...
    }
    
    receive() public payable {
        //...
    }
}
