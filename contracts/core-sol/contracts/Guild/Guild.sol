// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Notary } from "../Notary/Notary.sol";

contract Guild is Ownable {
  address private _token;
  bytes32 private constant FOUNDER = keccak256("FOUNDER");

  constructor(address token_) {
    _token = token_;
  }

  modifier _isFounder() {
    require(Notary(_token).hasRole(FOUNDER, msg.sender), "Guild:unauthorized");
    _;
  }

  function getToken() external returns (address token) {
    return _token;
  }

  function addMember(address user) external _isFounder {}

  function removeMember(address user) external _isFounder {}

  function isMember(address user) external view returns (address member) {}

  function getMember(address user) external view returns (address member) {}

  function getMembers() external view returns (address[] memory members) {}
}