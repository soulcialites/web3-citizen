// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { CitizenNotary } from "./CitizenNotary.sol";

contract Guild is Ownable {
  address private _token;
  bytes32 private constant FOUNDER = keccak256("FOUNDER");

  constructor(address token_) {
    _token = token_;
  }

  modifier _isFounder() {
    require(CitizenNotary(_token).hasRole(FOUNDER, msg.sender), "Guild:unauthorized");
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

contract GuildFactory is Ownable {
  function createGuild() external returns (address guild) {
    return (address(new Guild(0x0000000000000000000000000000000000000000)));
  }
}
