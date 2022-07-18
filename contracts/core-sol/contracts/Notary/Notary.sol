//SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import { ISoulbound } from "../interfaces/ISoulbound.sol";
import { CitizenAlpha } from "../CitizenAlpha.sol";

contract Notary is AccessControl {
  /// @notice CitizenToken with mintable controls set to address(this);
  address private _citizenToken;

  /// @notice Notary Role to enforce access controls
  bytes32 private constant NOTARY = keccak256("NOTARY");

  /**
   * @notice Notary Construction
   * @param _founders Array of Founding Citizens
   */
  constructor(address _citizenToken_, address[] memory _founders) {
    _citizenToken = _citizenToken_;

    // Grant Founders with
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    for (uint256 i = 0; i < _founders.length; i++) {
      _setupRole(DEFAULT_ADMIN_ROLE, _founders[i]);
      _setupRole(NOTARY, _founders[i]);
    }
    _setRoleAdmin(NOTARY, DEFAULT_ADMIN_ROLE);
  }

  /* ===================================================================================== */
  /* External Functions                                                                    */
  /* ===================================================================================== */

  function citizenToken() external view returns (address) {
    return _citizenToken;
  }

  /**
   * @notice Issue a new Citizenship
   * @param to address
   */
  function issue(address to) external {
    require(hasRole(NOTARY, _msgSender()), "Notary:unauthorized-access");
    _issue(to, _msgSender());
  }

  /**
   * @notice Batch Issue new Citizenships
   * @param to address
   */
  function issueBatch(address[] calldata to) external {
    require(hasRole(NOTARY, _msgSender()), "Notary:unauthorized-access");
    for (uint256 i = 0; i < to.length; i++) {
      _issue(to[i], _msgSender());
    }
  }

  /**
   * @notice Revoke an existing Citizenship
   * @param from address
   */
  function revoke(address from) external {
    require(hasRole(NOTARY, _msgSender()), "Notary:unauthorized-access");
    _revoke(from, _msgSender());
  }

  /**
   * @notice Batch Revoke new Citizenships
   * @param from address
   */
  function revokeBatch(address[] calldata from) external {
    _checkRole(NOTARY, _msgSender());
    for (uint256 i = 0; i < from.length; i++) {
      _revoke(from[i], _msgSender());
    }
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
