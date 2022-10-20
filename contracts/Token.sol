//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Token {
  string public name = "Simhadri Token";
  string public symbol = "ST";
  uint public totalSupply = 1000000;
  mapping(address => uint) balances;

  constructor() {
    balances[msg.sender] = totalSupply;
  }

  function transfer(address to, uint amount) external {
    require(balances[msg.sender] >= amount, "Not enough tokens");
    balances[msg.sender] -= amount;
    balances[to] += amount;
  }

  function balanceOf(address account) external view returns (uint) {
    return balances[account];
  }
}



//Greeter deployed to: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0

//Token deployed to: 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9



// Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// Greeter deployed to: 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9
// Token deployed to: 0x5FC8d32690cc91D4c39d9d3abcBD16989F875707