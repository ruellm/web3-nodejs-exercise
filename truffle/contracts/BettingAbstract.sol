pragma solidity >=0.6.0 <0.9.0;

abstract contract BettingAbstract {

  uint public constant MAX_BET=5 ether;
  uint public constant MIN_BET=1 ether;

  function guess(uint8 num, string memory name) public virtual payable returns (bool);

  function totalGuesses() public virtual returns (uint);
  
  function daysSinceLastWinning() public virtual view  returns (uint);

  function hoursSinceLastWinning() public virtual view returns (uint);

  function  minutesSinceLastWinning() public virtual view returns (uint);

  function getLastWinnerInfo() public virtual returns (address winnerAddress,
                                         string  memory name,
                                         uint    guessNum,
                                         uint    guessedAt,
                                         uint    ethersReceived);
                                         
  function checkWinning(address winnerAddress) public virtual returns (address retWinnerAddress, string memory name, uint guessVal, uint guessedAt);
  
  event WinningBet(address indexed winner, string name, uint amount);
  event LosingBet(address indexed winner, string name, uint amount);
}