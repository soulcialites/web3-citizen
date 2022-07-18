// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Guild } from "../Guild/Guild.sol";
import { CitizenAlpha } from "../CitizenAlpha.sol";
import { Metadata } from "../Metadata.sol";
import { Notary } from "../Notary/Notary.sol";

contract Web3TrustResolver is Ownable {
  address private immutable _metadata;
  address private immutable _notary;
  address private immutable _token;

  struct CitizenObject {
    string name;
    string description;
    string avatar;
    string did;
  }

  struct CitizenMetadata {
    string ensAlias;
    string ensNode;
    string ensResolver;
  }

  constructor(
    address _metadata_,
    address _notary_,
    address _token_
  ) {
    _metadata = _metadata_;
    _notary = _notary_;
    _token = _token_;
  }

  /* ===================================================================================== */
  /* External Functions                                                                    */
  /* ===================================================================================== */
  function getCitizen(address user) external view returns (CitizenObject memory member) {
    Metadata.Metadata memory _meta = Metadata(_metadata).getMetadata(user);
    CitizenObject memory _citizen = CitizenObject({
      name: _meta.name,
      description: _meta.description,
      avatar: _meta.avatar,
      did: _meta.did
    });
    return _citizen;
  }

  function getMetadata(address user) external view returns (CitizenMetadata memory member) {
    Metadata.Metadata memory _meta = Metadata(_metadata).getMetadata(user);
    CitizenMetadata memory _citizen = CitizenMetadata({
      ensAlias: _meta.ensAlias,
      ensNode: _meta.ensNode,
      ensResolver: _meta.ensResolver
    });
    return _citizen;
  }

  function isMember(address user, address guild) external view returns (address member) {
    return _isMember(user, guild);
  }

  function getMember(address user, address guild) external view returns (address member) {
    return _getMember(user, guild);
  }

  function getMembers(address guild) external view returns (address[] memory members) {
    return _getMembers(guild);
  }

  /* ===================================================================================== */
  /* Internal Functions                                                                    */
  /* ===================================================================================== */

  function _isMember(address user, address guild) internal view returns (address member) {
    return Guild(guild).isMember(user);
  }

  function _getMember(address user, address guild) internal view returns (address member) {
    return Guild(guild).getMember(user);
  }

  function _getMembers(address guild) internal view returns (address[] memory members) {
    return Guild(guild).getMembers();
  }
}
