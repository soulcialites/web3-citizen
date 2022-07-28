// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

import "./CitizenAlpha.sol";
import "./Nation/Nation.sol";
import "./Notary/Notary.sol";

contract Deployer {
  address private _svgRender;
  address private _metadata;
  address[] private _citizenships;
  address[] private _nations;
  address[] private _notaries;

  event CitizenshipStarted(address indexed citizenship, address indexed founder);
  event NationStarted(address indexed nation, address indexed founder);
  event NotaryStarted(address indexed notary, address indexed founder);

  constructor(address _metadata_) {
    _metadata = _metadata_;
  }

  function setupDemocracy(
    string memory name,
    string memory symbol,
    string memory nationName,
    string memory nationSymbol,
    address[] memory founders
  ) public {
    CitizenAlpha citizenAlpha_ = deployCitizenship(_metadata, name, symbol);
    address nation_ = deployNation(nationName, nationSymbol, address(citizenAlpha_), founders);
    address notary_ = deployNotary(address(citizenAlpha_), founders);
    citizenAlpha_.setNation(nation_);
    citizenAlpha_.setNotary(notary_);
  }

  function deployCitizenship(
    address metadata_,
    string memory name_,
    string memory symbol_
  ) public returns (CitizenAlpha) {
    CitizenAlpha citizenship_ = new CitizenAlpha(metadata_, name_, symbol_);
    _citizenships.push(address(citizenship_));
    emit CitizenshipStarted(address(citizenship_), msg.sender);
    return citizenship_;
  }

  function deployNation(
    string memory name,
    string memory symbol,
    address citizenAlpha,
    address[] memory founders
  ) public returns (address) {
    Nation nation_ = new Nation(name, symbol, citizenAlpha, founders);
    _nations.push(address(nation_));
    emit NationStarted(address(nation_), msg.sender);
    return address(nation_);
  }

  function deployNotary(address _citizenAlpha_, address[] memory notaries)
    public
    returns (address)
  {
    Notary notary_ = new Notary(_citizenAlpha_, notaries);
    _notaries.push(address(notary_));
    emit NotaryStarted(address(notary_), msg.sender);
    return address(notary_);
  }

  function getCitizenships() public view returns (address[] memory citizenships) {
    return _citizenships;
  }

  function getCitizenshipCount() public view returns (uint256 count) {
    return _nations.length;
  }

  function getNations() public view returns (address[] memory nations) {
    return _nations;
  }

  function getNationCount() public view returns (uint256 count) {
    return _nations.length;
  }

  function getNotaries() public view returns (address[] memory notaries) {
    return _notaries;
  }

  function getNotaryCount() public view returns (uint256 count) {
    return _notaries.length;
  }
}
