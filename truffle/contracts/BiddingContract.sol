// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract BiddingContract {

  address payable  contractOwner;
  bytes32   name;
  string    description;
  uint      duration;
  uint      startBid;

  uint      createdAt;

  struct Bidder {
    address payable  bidder;
    string    name;
    uint      bidAmount;
    // Ethers pull pattern used
    bool      claimedEthers;
  }

  // Declare the events
  event HighBidChanged(address addr, bytes32 nm, uint  newHighBid);
  event BidFailed(address addr, bytes32 nm, uint bidAmt);

  // Maintain all bidders in an array
  Bidder[]  bidders;

  // This maintains the high bidder
  Bidder    highBidder;

  modifier OwnerOnly {
    if(contractOwner != msg.sender)
      revert();
    else
      _;  //require for modifier body
  }
  
  // duration in minutes
  // start price in ethers
  constructor(bytes32 nm, string memory desc, uint dur, uint sBid) public {
    // constructor
    name=nm;
    description=desc;
    duration=dur;
    startBid=sBid;
    
    // Initalize createdAt to current time
    createdAt = block.timestamp;

    // set contract owner
    contractOwner = msg.sender;
  }

  // Bid function is what gets called by any bidder
  function placeBid(string memory nm, uint bid) public {

    // check if the duration has not expired
    // if it has then throw an exception
    require((block.timestamp - createdAt) < duration);

    Bidder memory bidder;
    bidder.name = nm;
    bidder.bidAmount = bid;
    bidder.bidder = msg.sender;
    bidders.push(bidder);

    uint currentBid = highBidder.bidAmount;
    if(bid <= currentBid || currentBid == 0) {   // Consider the case when there is no bid
      // Emit a BidFailed Event
      emit BidFailed(msg.sender, name, bid);

      // Create a Bidder structure and add to bidders array
      // .. added above
    } else {
      // If bid > currentBid
      // Add the current high bidder to bidders array
      // .. added above
      // Replace the highBidder with the new high bidder
      highBidder = bidder;

      // emit High bid event
      emit HighBidChanged(msg.sender, name, bid);
    }
  }

  function getHighBid() public view returns(uint){
    // Return the bid amount held in high bidder
    return highBidder.bidAmount;
  }

  // This is invoked by anyone to chek if there is are ehters
  // in the contract that they can claim
  // Losers will be added to the bidders array ... the claim flag in struct
  // maintains the status of whether the caller has already been given the ethers or not
  function  getClaimAmount() public view returns(uint){
    // check if msg.sender in the bidders
    uint i;
    for(i = 0; i < bidders.length; i++) {
      if(bidders[i].bidder == msg.sender) {
        break;
      }
    }

    require(i < bidders.length);

    // check if claims flag is FALSE
    if(!bidders[i].claimedEthers) {
      // return the bid amount
      return bidders[i].bidAmount;
    }
    
    return 0;
  }

  // Losers will call this to get their bid ethers back
  function claimEthers() public {
    // Check if caller is eligible for clain - getClaimAmout
    require(getClaimAmount() > 0);

    uint i;
    for(i = 0; i < bidders.length; i++) {
      if(bidders[i].bidder == msg.sender) {
        break;
      }
    }

    require(i < bidders.length);

    // If they are then send ethers to them
    bidders[i].bidder.transfer(bidders[i].bidAmount);

    // remove the bidder from the bidders
    delete bidders[i];
  }

  // Can a bid end if there are unclaimed ethers 
  // In later version the claims data will be moved to a separate contract
  // Claims will be made losers against the separate contract
  function  canBidEnd() public view returns (bool) {
    // bidders.length == 0 for bid to end
    if(bidders.length == 0)
      return true;
    
    // check if the bidding is active i.e., not expired
    if((block.timestamp - createdAt) >= duration)
      return true;
    
    return false;
  }

  // This ends the bidding 
  // Only owner can call this function - apply modifier
  // All ethers returned to the owner as part of self destruct
  function endBidding() public OwnerOnly {
    for(uint i = 0; i < bidders.length; i++) {
       bidders[i].bidder.transfer(bidders[i].bidAmount);
    }

    selfdestruct(contractOwner);
  }
}