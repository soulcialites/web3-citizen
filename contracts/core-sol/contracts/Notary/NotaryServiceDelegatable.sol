//SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import { Notary } from "../Notary/Notary.sol";
import { RevokableOwnableDelegatable } from "../Delegatable/caveat-enforcers/RevokableOwnableDelegatable.sol";

contract NotaryServiceDelegatable is RevokableOwnableDelegatable {
  address private immutable _notary;

  /* ===================================================================================== */
  /* Initialization                                                                        */
  /* ===================================================================================== */
  constructor(address _notary_) RevokableOwnableDelegatable("EIP4430Prototype") {
    _notary = _notary_;
  }

  /* ===================================================================================== */
  /* External Functions                                                                    */
  /* ===================================================================================== */
  function getNotary() external view returns (address notary) {
    return _notary;
  }

  function claim() external onlyOwner {
    Notary(_notary).issue(_msgSender());
  }

  // function enforceCaveat(
  //   bytes calldata terms,
  //   Transaction calldata transaction,
  //   bytes32 delegationHash
  // ) public pure override returns (bool) {
  //   // Owner methods are not delegatable in this contract:
  //   bytes4 targetSig = bytes4(transaction.data[0:4]);
  //   // transferOwnership(address newOwner)
  //   require(targetSig != 0xf2fde38b, "transferOwnership is not delegatable");
  //   // renounceOwnership()
  //   require(targetSig != 0x79ba79d8, "renounceOwnership is not delegatable");

  //   return true;
  // }

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
        // Load the 32 bytes word from memory with the address on the lower 20 bytes, and mask those.
        sender := and(mload(add(array, index)), 0xffffffffffffffffffffffffffffffffffffffff)
      }
    } else {
      sender = msg.sender;
    }
    return sender;
  }
}
