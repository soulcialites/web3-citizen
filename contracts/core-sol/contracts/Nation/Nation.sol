// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Notary } from "../Notary/Notary.sol";

contract Nation is AccessControl {
  /// @notice CitizenAlpha instance
  address private _citizenAlpha;

  /// @notice Founder Role to enforce access controls
  bytes32 private constant FOUNDER = keccak256("FOUNDER");

  mapping(bytes32 => bool) private _roleActive;

  /**
   * @notice Notary Construction
   * @param _founders Array of Founding Citizens
   */
  constructor(address _citizenAlpha_, address[] memory _founders) {
    _citizenAlpha = _citizenAlpha_;
    _roleActive[FOUNDER] = true;
    _roleActive[DEFAULT_ADMIN_ROLE] = true;
    for (uint256 i = 0; i < _founders.length; i++) {
      _setupRole(DEFAULT_ADMIN_ROLE, _founders[i]);
      _setupRole(FOUNDER, _founders[i]);
    }
    _setRoleAdmin(FOUNDER, DEFAULT_ADMIN_ROLE);
  }

  modifier _isFounder() {
    require(hasRole(FOUNDER, _msgSender()), "Nation:unauthorized");
    _;
  }

  modifier _onlyAdmin(bytes32 role) {
    address sender_ = _msgSender();
    require(
      hasRole(getRoleAdmin(role), sender_) || hasRole(DEFAULT_ADMIN_ROLE, sender_),
      "Nation:unauthotized"
    );
    _;
  }

  /* ===================================================================================== */
  /* External Functions                                                                    */
  /* ===================================================================================== */

  function citizenAlpha() external view returns (address) {
    return _citizenAlpha;
  }

  function isRole(bytes32 role) external view returns (bool active) {
    return _roleActive[role];
  }

  function hasRole(bytes32 role, address account) public view virtual override returns (bool) {
    if (!_roleActive[role]) {
      return false;
    }
    return super.hasRole(role, account);
  }

  function roleStatus(bytes32 role) external view returns (bool status) {
    return _roleActive[role];
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
    require(_roleActive[role], "Notary:inactive-role");
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
    require(role != DEFAULT_ADMIN_ROLE, "Notary:invalid-request");
    require(_roleActive[role], "Notary:inactive-role");
    _revokeRole(role, citizen);
  }

  /**
   * @notice Enable Role status
   * @param role bytes32
   */
  function enableRole(bytes32 role) external onlyRole(FOUNDER) {
    require(_roleActive[role] == false, "Notary:role-enabled");
    _setRoleAdmin(role, FOUNDER);
    _roleActive[role] = true;
  }

  /**
   * @notice Enable Role status
   * @param role bytes32
   * @param adminRole bytes32
   */
  function enableRole(bytes32 role, bytes32 adminRole) external onlyRole(DEFAULT_ADMIN_ROLE) {
    require(_roleActive[role] == false, "Notary:role-enabled");
    _setRoleAdmin(role, adminRole);
    _roleActive[role] = true;
  }

  /**
   * @notice Disable Role status
   * @param role bytes32
   */
  function disableRole(bytes32 role) external _onlyAdmin(role) {
    require(_roleActive[role] == true, "Notary:role-disabled");
    _setRoleAdmin(role, DEFAULT_ADMIN_ROLE);
    _roleActive[role] = false;
  }
}
