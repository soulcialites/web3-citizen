//SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

interface IMetadataSource {
  function get(address _address)
    external
    view
    returns (string[] memory keys, string[] memory values);

  function count(address _address) external view returns (uint256);
}
