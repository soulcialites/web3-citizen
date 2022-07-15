//SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import { ISoulbound } from "./interfaces/ISoulbound.sol";
import { CitizenAlpha } from "./CitizenAlpha.sol";

contract CitizenNotary is AccessControl {
  /// @notice CitizenToken with mintable controls set to address(this);
  address private _citizenToken;

  /// @notice Notary Role to enforce access controls
  bytes32 private constant NOTARY = keccak256("NOTARY");

  /// @notice Founder Role to enforce access controls
  bytes32 private constant FOUNDER = keccak256("FOUNDER");

  mapping(bytes32 => bool) private _roleInitialized;

  /**
   * @notice CitizenNotary Construction
   * @param _founders Array of Founding Citizens
   */
  constructor(address _citizenToken_, address[] memory _founders) {
    _citizenToken = _citizenToken_;
    _roleInitialized[DEFAULT_ADMIN_ROLE] = true;
    _roleInitialized[NOTARY] = true;
    _roleInitialized[FOUNDER] = true;

    // Grant Founders with
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    for (uint256 i = 0; i < _founders.length; i++) {
      _setupRole(DEFAULT_ADMIN_ROLE, _founders[i]);
      _setupRole(FOUNDER, _founders[i]);
      _setupRole(NOTARY, _founders[i]);
      _setRoleAdmin(FOUNDER, DEFAULT_ADMIN_ROLE);
      _setRoleAdmin(NOTARY, DEFAULT_ADMIN_ROLE);
    }
  }

  modifier _hasNotaryPermissions(address _sender) {
    require(
      hasRole(NOTARY, _sender) || hasRole(FOUNDER, _sender),
      "CitizenNotary:unauthorized-access"
    );
    _;
  }

  /* ===================================================================================== */
  /* External Functions                                                                    */
  /* ===================================================================================== */

  function citizenToken() external view returns (address) {
    return _citizenToken;
  }

  function isRole(bytes32 role) external view returns (bool active) {
    return _roleInitialized[role];
  }

  function hasRole(bytes32 role, address account) public view virtual override returns (bool) {
    if (!_roleInitialized[role]) {
      return false;
    }
    return super.hasRole(role, account);
  }

  /**
   * @notice Issue a new Citizenship
   * @param to address
   */
  function issue(address to) external _hasNotaryPermissions(_msgSender()) {
    _issue(to, _msgSender());
  }

  /**
   * @notice Batch Issue new Citizenships
   * @param to address
   */
  function issueBatch(address[] calldata to) external _hasNotaryPermissions(_msgSender()) {
    for (uint256 i = 0; i < to.length; i++) {
      _issue(to[i], _msgSender());
    }
  }

  /**
   * @notice Revoke an existing Citizenship
   * @param from address
   */
  function revoke(address from) external _hasNotaryPermissions(_msgSender()) {
    _revoke(from, _msgSender());
  }

  /**
   * @notice Toggle Role status
   * @param role bytes32
   */
  function toggleRole(bytes32 role) external onlyRole(DEFAULT_ADMIN_ROLE) {
    _roleInitialized[role] = !_roleInitialized[role];
  }

  /**
   * @notice Grant Role to Citizen
   * @param role bytes32
   * @param citizen address
   */
  function grantRole(bytes32 role, address citizen)
    public
    virtual
    override
    onlyRole(getRoleAdmin(role))
  {
    require(_roleInitialized[role], "CitizenNotary:inactive-role");
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
    override
    onlyRole(getRoleAdmin(role))
  {
    require(role != DEFAULT_ADMIN_ROLE, "CitizenNotary:invalid-request");
    require(_roleInitialized[role], "CitizenNotary:inactive-role");
    _revokeRole(role, citizen);
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
   * @notice Check Founder status
   * @param citizen address
   * @return status bool
   */
  function isCitizen(address citizen) external view returns (bool status) {
    return CitizenAlpha(_citizenToken).isCitizen(citizen);
  }

  /* ===================================================================================== */
  /* Internal Functions                                                                    */
  /* ===================================================================================== */

  function _issue(address _to, address _link) internal {
    CitizenAlpha(_citizenToken).issue(_to, _link);
  }

  function _revoke(address _from, address _link) internal {
    CitizenAlpha(_citizenToken).revoke(_from, _link);
  }
}
