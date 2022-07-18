//SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "hardhat/console.sol";
import { Notary } from "../Notary/Notary.sol";
import { RevokableOwnableDelegatable } from "../Delegatable/caveat-enforcers/RevokableOwnableDelegatable.sol";

contract NotaryServiceDelegatable is RevokableOwnableDelegatable {
  address private immutable _notary;

  /* ===================================================================================== */
  /* Initialization                                                                        */
  /* ===================================================================================== */
  constructor(address _notary_) RevokableOwnableDelegatable("NotaryServiceDelegatable") {
    _notary = _notary_;
  }

  /* ===================================================================================== */
  /* External Functions                                                                    */
  /* ===================================================================================== */
  function getNotary() external view returns (address notary) {
    return _notary;
  }

  function claim(address newCitizen) external {
    console.log(owner());
    console.log(_msgSender());
    require(owner() == _msgSender(), "Unauthorized");
    Notary(_notary).issue(newCitizen);
  }

  /* ===================================================================================== */
  /* Internal Functions                                                                    */
  /* ===================================================================================== */

  function _msgSender()
    internal
    view
    override(RevokableOwnableDelegatable)
    returns (address sender)
  {
    if (msg.sender == address(this)) {
      bytes memory array = msg.data;
      uint256 index = msg.data.length;
      assembly {
        sender := and(mload(add(array, index)), 0xffffffffffffffffffffffffffffffffffffffff)
      }
    } else {
      sender = msg.sender;
    }
    return sender;
  }
}
