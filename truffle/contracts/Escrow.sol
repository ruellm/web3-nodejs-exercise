pragma solidity >=0.4.22 <0.9.0;

contract Escrow {
    enum State { AWAITING_PAYMENT, AWAITING_DELIVERY, COMPLETE }
    
    State public currState;
    
    address public buyer;
    address payable public seller;
    
    modifier onlyBuyer() {
        require(msg.sender == buyer, "Only buyer can call this method");
        _;
    }
    
    constructor(address _buyer, address payable _seller) public {
        buyer = _buyer;
        seller = _seller;
    }
    
    function deposit() onlyBuyer external payable {
        require(currState == State.AWAITING_PAYMENT, "Already paid");
        currState = State.AWAITING_DELIVERY;
    }
    
    function confirmDelivery() onlyBuyer external {
        require(currState == State.AWAITING_DELIVERY, "Cannot confirm delivery");
        
        // transfers money from contract (this) to the seller
        // check trannsfer definition here
        // at this point the balance is in the contract wallet
        // https://docs.soliditylang.org/en/v0.8.4/units-and-global-variables.html#address-related
        seller.transfer(address(this).balance);
        currState = State.COMPLETE;
    }
}