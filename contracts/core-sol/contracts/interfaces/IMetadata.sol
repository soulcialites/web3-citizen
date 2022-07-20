//SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

interface IMetadata {
  function getAvatar(address citizen) external view returns (string memory avatar);

  function getImage(address citizen) external view returns (string memory avatar);
}
