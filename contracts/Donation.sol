//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

contract Donation {
    string public name = "Donation project";

    address public owner;
    address[] private addressOfDonator;

    mapping(address => uint256) public donations;
    mapping(address => bool) private is_alredy_donated;

    constructor() {
        owner = msg.sender;
    }

    function acceptDonation() external payable {
        uint256 amountDonations = donations[msg.sender];
        donations[msg.sender] = amountDonations + msg.value;

        if (!is_alredy_donated[msg.sender]) {
            is_alredy_donated[msg.sender] = true;
            addressOfDonator.push(msg.sender);
        }
    }

    function withdraw(address payable from, uint256 amount) external {
        require(msg.sender == owner, "not owner");
        from.transfer(amount);
    }

    function getListOfDonators() external view returns (address[] memory) {
        return addressOfDonator;
    }
}
