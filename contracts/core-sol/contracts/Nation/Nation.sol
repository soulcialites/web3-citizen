// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

import { AccessControlEnumerable, AccessControl, IAccessControl } from "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { CitizenAlpha } from "../CitizenAlpha.sol";
import { Notary } from "../Notary/Notary.sol";

/**
 * @title Nation
 * @author Kames Geraghty
 * @notice Nation is an AccessControl layer for CitizenAlpha.
 * @dev Extends Citizen on-chain permissions using nested Roles.
           
 */
contract Nation is AccessControlEnumerable {
  // Nation name
  string private _name;

  // Nation symbol
  string private _symbol;

  // Nation DID (Decentralized Identifier)
  string private _did;

  /// @notice CitizenAlpha instance
  address private _citizenAlpha;

  /// @notice Founder Role
  bytes32 private constant FOUNDER = keccak256("FOUNDER");

  /// @notice Governance Role
  bytes32 private constant GOVERNANCE = keccak256("GOVERNANCE");

  /// @notice Global Role AccessControl
  mapping(bytes32 => bool) private _roleActive;

  /**
   * @notice Nation Constructor
   * @param name string - Name of Nation
   * @param symbol string - Symbol of Nation
   * @param citizenAlpha address - Address of CitizenAlpha
   * @param founders array(address) - Array of Founders
   */
  constructor(
    string memory name,
    string memory symbol,
    address citizenAlpha,
    address[] memory founders
  ) {
    _name = name;
    _symbol = symbol;
    _citizenAlpha = citizenAlpha;
    _roleActive[FOUNDER] = true;
    _roleActive[GOVERNANCE] = true;
    _roleActive[DEFAULT_ADMIN_ROLE] = true;
    for (uint256 i = 0; i < founders.length; i++) {
      _setupRole(FOUNDER, founders[i]);
      _setupRole(DEFAULT_ADMIN_ROLE, founders[i]);
    }
    _setRoleAdmin(FOUNDER, DEFAULT_ADMIN_ROLE);
  }

  /**
   * @notice Admin modifier
   * @param role bytes32
   */
  modifier _onlyAdmin(bytes32 role) {
    address sender_ = _msgSender();
    require(
      hasRole(getRoleAdmin(role), sender_) ||
        hasRole(GOVERNANCE, sender_) ||
        hasRole(DEFAULT_ADMIN_ROLE, sender_),
      "Nation:unauthorized"
    );
    _;
  }

  /**
   * @notice Governance modifier
   */
  modifier _onlyGovernance() {
    address sender_ = _msgSender();
    require(
      (hasRole(GOVERNANCE, sender_) || hasRole(DEFAULT_ADMIN_ROLE, sender_)),
      "Nation:unauthorized"
    );
    _;
  }

  /* ===================================================================================== */
  /* External Functions                                                                    */
  /* ===================================================================================== */

  function name() public view virtual returns (string memory) {
    return _name;
  }

  function symbol() public view virtual returns (string memory) {
    return _symbol;
  }

  function did() public view virtual returns (string memory) {
    return _did;
  }

  function citizenAlpha() public view virtual returns (address) {
    return _citizenAlpha;
  }

  /**
   * @notice Get CitizenAlpha instance
   * @return citizenAlpha address of CitizenAlpha instance
   */
  function getCitizenAlpha() external view returns (address) {
    return _citizenAlpha;
  }

  /**
   * @notice Check if Account has Role
   * @dev Include check for Role activication is Citizenship
   * @return active bool
   */
  function hasRole(bytes32 role, address account)
    public
    view
    virtual
    override(AccessControl, IAccessControl)
    returns (bool)
  {
    if (!_roleActive[role] || !CitizenAlpha(_citizenAlpha).isCitizen(account)) {
      return false;
    }
    return super.hasRole(role, account);
  }

  /**
   * @notice Check Founder status
   * @param citizen address
   * @return status bool
   */
  function isFounder(address citizen) external view returns (bool status) {
    return hasRole(FOUNDER, citizen);
  }

  /**
   * @notice Check Governance status
   * @param module address
   * @return status bool
   */
  function isGovernance(address module) external view returns (bool status) {
    return hasRole(GOVERNANCE, module);
  }

  /**
   * @notice Get status of Role global settings
   * @return status bool
   */
  function roleStatus(bytes32 role) external view returns (bool status) {
    return _roleActive[role];
  }

  /**
   * @notice Grant Role to Citizen
   * @param role bytes32
   * @param citizen address
   */
  function grantRole(bytes32 role, address citizen)
    public
    virtual
    override(AccessControl, IAccessControl)
    _onlyAdmin(role)
  {
    require(_roleActive[role], "Nation:inactive-role");
    _grantRole(role, citizen);
  }

  /**
   * @notice Revoke Role from Citizen
   * @param role bytes32
   * @param citizen address
   */
  function revokeRole(bytes32 role, address citizen)
    public
    virtual
    override(AccessControl, IAccessControl)
    _onlyAdmin(role)
  {
    require(role != DEFAULT_ADMIN_ROLE, "Nation:invalid-request");
    require(_roleActive[role], "Nation:inactive-role");
    _revokeRole(role, citizen);
  }

  /**
   * @notice Enable Role status
   * @param role bytes32
   */
  function enableRole(bytes32 role) external onlyRole(FOUNDER) {
    require(_roleActive[role] == false, "Nation:role-enabled");
    _setRoleAdmin(role, FOUNDER);
    _roleActive[role] = true;
  }

  /**
   * @notice Enable Role status
   * @param role bytes32
   * @param adminRole bytes32
   */
  function enableRoleWithAdmin(bytes32 role, bytes32 adminRole) external _onlyGovernance {
    require(_roleActive[role] == false, "Nation:role-enabled");
    _setRoleAdmin(role, adminRole);
    _roleActive[role] = true;
  }

  /**
   * @notice Disable Role status
   * @param role bytes32
   */
  function disableRole(bytes32 role) external _onlyGovernance {
    require(_roleActive[role] == true, "Nation:role-disabled");
    _setRoleAdmin(role, DEFAULT_ADMIN_ROLE);
    _roleActive[role] = false;
  }

  /**
   * @notice Set Role admin
   * @param role bytes32
   * @param adminRole bytes32
   */
  function setRoleAdmin(bytes32 role, bytes32 adminRole) external _onlyGovernance {
    _setRoleAdmin(role, adminRole);
  }

  function setCitizenAlpha(address citizenAlpha) external _onlyGovernance {
    _citizenAlpha = citizenAlpha;
  }

  function setDid(string calldata did) external _onlyGovernance {
    _did = did;
  }

  function setName(string calldata name) external _onlyGovernance {
    _name = name;
  }

  function setSymbol(string calldata symbol) external _onlyGovernance {
    _symbol = symbol;
  }
}
