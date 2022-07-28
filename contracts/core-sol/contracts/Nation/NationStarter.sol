// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

import "./Nation.sol";

contract NationStarter {
  address[] private _nations;

  event NationStarted(address indexed M, address indexed _summoner);

  function startNation(
    string memory name,
    string memory symbol,
    address _citizenAlpha_,
    address[] memory _founders
  ) public {
    Nation nation_ = new Nation(name, symbol, _citizenAlpha_, _founders);

    _nations.push(address(nation_));

    emit NationStarted(address(nation_), msg.sender);
  }

  function getNations() public view returns (address[] memory nations) {
    return _nations;
  }

  function getNationCount() public view returns (uint256 count) {
    return _nations.length;
  }
}
