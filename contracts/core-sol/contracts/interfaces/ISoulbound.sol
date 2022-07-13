//SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

interface ISoulbound {
  function ownerOf(uint256 _id) external view returns (address owner);

  function issue(address _soul, address _issuer) external;

  function revoke(address _soul, address _revoker) external;

  function getId(address citizen) external view returns (uint256);

  function getLink(address citizen) external view returns (address issuer);

  function hasRole(bytes32 role, address citizen) external view returns (bool);
}
