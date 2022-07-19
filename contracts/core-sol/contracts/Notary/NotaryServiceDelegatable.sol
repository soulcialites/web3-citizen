//SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import { Notary } from "../Notary/Notary.sol";
import { RevokableOwnableDelegatable } from "../Delegatable/caveat-enforcers/RevokableOwnableDelegatable.sol";

/**
 * @title NotaryServiceDelegatable
 * @author Kames Geraghty
 * @notice Delegatable off-chain Citizenship issuance permissions.
 */
contract NotaryServiceDelegatable is RevokableOwnableDelegatable {
  /// @notice Notary instance
  address private immutable _notary;

  constructor(address _notary_) RevokableOwnableDelegatable("NotaryServiceDelegatable") {
    _notary = _notary_;
  }

  /**
   * @notice Get Notary instance
   * @return notary address
   */
  function getNotary() external view returns (address notary) {
    return _notary;
  }

  /**
   * @notice Issue Citizenship via Notary exeuction
   * @dev Inteneded to be used with Delegatable.eth invoke for third-party execution.
   * @param newCitizen address
   */
  function issue(address newCitizen) external {
    require(owner() == _msgSender(), "Unauthorized");
    Notary(_notary).issue(newCitizen);
  }
}
