//SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import { Base64 } from "base64-sol/base64.sol";
import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { Metadata } from "./Metadata.sol";
import { Nation } from "./Nation/Nation.sol";
import { Notary } from "./Notary/Notary.sol";

/**
 * @title CitizenAlpha
 * @author Kames Geraghty
 * @notice CitizenAlpha is a Web3 of Trust experiment.
 */
contract CitizenAlpha is ERC721, Ownable {
  /// @notice Total citizenships issued
  uint256 private _idCounter;

  /// @notice Nation instance to manage Global AccessControl
  address private _nation;

  /// @notice Notary instance w/ authority to issue Citizenship
  address private _notary;

  /// @notice Metadata instance used to generate token metadata
  address private _metadata;

  /// @notice TrustResolver instance
  address private _resolver;

  /// @notice Enable tokenURI split listener
  bool private _uriSplitter;

  /// @notice Reverse lookup of a tokenId using the owner address
  mapping(address => uint256) private _tokens;

  /// @notice Lookup address of Citizenship issuer
  mapping(address => address) private _links;

  /**
   * @notice Emit when Citizenship is issued.
   * @param id Citizen ID
   * @param citizen Address of new Citizen
   * @param link Address of  Citizen issuing new Citizenship
   */
  event Issued(uint256 id, address indexed citizen, address indexed link);

  /**
   * @notice Emit when Citizenship is revoked.
   * @param id Citizen ID
   * @param citizen Address of new Citizen
   * @param link Address of Founder revoking Citizenship
   */
  event Revoked(uint256 id, address indexed citizen, address indexed link);

  /**
   * @notice Emit when Metadata instnace is updated.
   * @param metadata Address of new Metadata instance
   */
  event NewMetadata(address indexed metadata);

  /**
   * @notice Emit when Nation instnace is updated.
   * @param nation Address of new Nation instance
   */
  event NewNation(address indexed nation);

  /**
   * @notice Emit when Notary instnace is updated.
   * @param notary Address of new Notary instance
   */
  event NewNotary(address indexed notary);

  /**
   * @notice CitizenAlpha Construction
   * @param metadata_ address - Metadata instance
   * @param name_ string - Name of ERC721 token
   * @param symbol_ string - Symbol of ERC721 token
   */
  constructor(
    address metadata_,
    string memory name_,
    string memory symbol_
  ) ERC721(name_, symbol_) {
    _metadata = metadata_;
  }

  /* ===================================================================================== */
  /* External Functions                                                                    */
  /* ===================================================================================== */

  /**
   * @notice Get Metadata instance
   * @return metadata Metadata
   */
  function getMetadata() external view returns (address metadata) {
    return _metadata;
  }

  /**
   * @notice Get Nation instance
   * @return nation Nation
   */
  function getNation() external view returns (address nation) {
    return _nation;
  }

  /**
   * @notice Get Notary instance
   * @return notary Notary
   */
  function getNotary() external view returns (address notary) {
    return _notary;
  }

  /**
   * @notice Generate token URI
   * @param tokenId uint256
   * @return metadata string
   */
  function tokenURI(uint256 tokenId) public view override returns (string memory) {
    Metadata metadata_ = Metadata(_metadata);
    if (!_uriSplitter) {
      return metadata_.tokenURI(tokenId);
    } else {
      return
        _resolver == msg.sender ? metadata_.tokenURI(tokenId) : metadata_.tokenURIMinimal(tokenId);
    }
  }

  /**
   * @notice Get Citizen Image
   * @param citizen address
   * @return avatar string
   */
  function getAvatar(address citizen) external view returns (string memory avatar) {
    return Metadata(_metadata).getAvatar(citizen);
  }

  /**
   * @notice Check Citizenship ID
   * @param citizen address
   * @return id uint256
   */
  function getId(address citizen) external view returns (uint256) {
    require(_isCitizen(citizen), "CitizenAlpha:not-active-citizen");
    return _tokens[citizen];
  }

  /**
   * @notice Get Citizen Image
   * @param citizen address
   * @return image string
   */
  function getImage(address citizen) external view returns (string memory image) {
    return Metadata(_metadata).getImage(citizen);
  }

  /**
   * @notice Lookup the issuer of Citizenship
   * @param citizen address
   * @return issuer address
   */
  function getLink(address citizen) external view returns (address issuer) {
    return _links[citizen];
  }

  /**
   * @notice Check Role status
   * @param citizen Address of Citizen
   * @return status bool
   */
  function hasRole(bytes32 role, address citizen) public view returns (bool) {
    return Nation(_nation).hasRole(role, citizen);
  }

  /**
   * @notice Check Citizenship status
   * @param citizen Address of potential Citizen
   * @return status bool
   */
  function isCitizen(address citizen) external view returns (bool status) {
    return balanceOf(citizen) == 1 ? true : false;
  }

  /**
   * @notice Read totalCitizens (_idCounter)
   * @return totalCitizens uint256
   */
  function totalCitizens() external view returns (uint256) {
    return _idCounter;
  }

  /**
   * @notice Issue a new Citizenship
   * @param to address
   */
  function issue(address to, address link) external {
    require(_notary == _msgSender(), "CitizenAlpha:unauthorized-accesss");
    require(!_isCitizen(to), "CitizenAlpha:is-citizen");
    require(!_isPreviouslyIssued(to), "CitizenAlpha:revoked-citizenship");
    _issue(to, link);
  }

  /**
   * @notice Revoke an existing Citizenship
   * @param from address
   */
  function revoke(address from, address revoker) external {
    require(_notary == _msgSender(), "CitizenAlpha:unauthorized-accesss");
    require(_isCitizen(from), "CitizenAlpha:not-citizen");
    _revoke(from, revoker);
  }

  /**
   * @notice Set URI Splitter status
   * @param status bool
   */
  function setURISplitter(bool status) external onlyOwner {
    _uriSplitter = status;
  }

  /**
   * @notice Set Metadata instance
   * @param metadata address
   */
  function setMetadata(address metadata) external onlyOwner {
    _metadata = metadata;
    emit NewMetadata(metadata);
  }

  /**
   * @notice Set Nation instance
   * @param nation address
   */
  function setNation(address nation) external onlyOwner {
    _nation = nation;
    emit NewNation(nation);
  }

  /**
   * @notice Set Notary instance
   * @param notary address
   */
  function setNotary(address notary) external onlyOwner {
    _notary = notary;
    emit NewNotary(notary);
  }

  /**
   * @notice Override transferFrom to make non-transferable
   */
  function transferFrom(
    address,
    address,
    uint256
  ) public virtual override {
    revert("CitizenAlpha: Soulbound");
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC721)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  /* ===================================================================================== */
  /* Internal Functions                                                                    */
  /* ===================================================================================== */

  function _isCitizen(address citizen) internal view returns (bool) {
    return balanceOf(citizen) == 1 ? true : false;
  }

  /**
   * @dev First Founder can be issued<>revoked<>issued.
   *      All other address can only be issued<>revoked.
   */
  function _isPreviouslyIssued(address citizen) internal view returns (bool) {
    return _tokens[citizen] != 0 ? true : false;
  }

  function _revoke(address from, address link) internal {
    uint256 tokenId = _tokens[from];
    _burn(tokenId);
    emit Revoked(tokenId, from, link);
  }

  function _issue(address to, address link) internal {
    uint256 __idCounter = _idCounter++;
    _links[to] = link;
    _tokens[to] = __idCounter;
    _mint(to, __idCounter);
    emit Issued(__idCounter, to, link);
  }
}
