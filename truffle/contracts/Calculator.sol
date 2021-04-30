// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract Calculator {

  uint result;

  event NumberAdded(address responsible, uint result, uint adder);

  constructor() public {
    // constructor
    result=10;
  }

  // returns the result
  function getResult() public view returns (uint){
    //uint[] someArray = [1,2]; compile error
    //uint[] balance = new uint[](10); // error as well
    //uint[] array; // error as well as not pointing to any

    return result;
  }

  // result = result + num
  function addToNumber(uint num) public returns (uint) {
    result += num;
    emit NumberAdded(msg.sender, result, num);
    return result;
  }

  // result = result - num
  function substractFromNumber(uint num) public returns (uint) {
    result -= num;
    return result;
  }

  // result = result * num
  function multiplyWithNumber(uint num) public returns (uint) {
      result *= num;
      return result;
  }

  // result = result / num
  function divideNumberBy(uint num) public returns (uint) {
      result/=num;
      return result;
  }

  function double() public returns (uint) {
      result += result;
      return result;
  }

  function half() public returns (uint) {
    result/=2;
    return result;
  }

  function getMultipleResult() public pure returns(uint16, uint16) {  // pure because return values are connstants
    return (814, 819);
  }
}
