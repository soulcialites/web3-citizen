// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Notary } from "../Notary/Notary.sol";

contract Guild is Ownable, AccessControl {
  /// @notice CitizenAlpha instance
  address private _citizenAlpha;

  constructor(address _citizenToken_) {
    _citizenAlpha = _citizenToken_;
  }

  function addMember(address user) external {}

  function removeMember(address user) external {}

  function isMember(address user) external view returns (address member) {}

  function getMember(address user) external view returns (address member) {}

  function getMembers() external view returns (address[] memory members) {}
}
