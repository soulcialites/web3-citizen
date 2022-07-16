// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { NameEncoder } from "../libraries/NameEncoder.sol";
import { IMetadataSource } from "../interfaces/IMetadataSource.sol";
import { IReverseRegistrar } from "../interfaces/ENS/IReverseRegistrar.sol";
import { ITextResolver } from "../interfaces/ENS/ITextResolver.sol";
import { IDefaultReverseResolver } from "../interfaces/ENS/IDefaultReverseResolver.sol";

contract DataENS is IMetadataSource, Ownable {
  using NameEncoder for string;

  string[] private traitKeys;
  address private constant RESOLVER = 0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41;
  address private constant REVERSE_REGISTRAR = 0x084b1c3C81545d370f3634392De611CaaBFf8148;
  address private constant DEFAULT_REVERSE_RESOLVER = 0xA2C122BE93b0074270ebeE7f6b7292C7deB45047;

  constructor() {
    traitKeys.push("avatar");
    traitKeys.push("url");
    traitKeys.push("description");
    traitKeys.push("com.github");
    traitKeys.push("com.twitter");
    traitKeys.push("org.telegram");
    traitKeys.push("did");
  }

  /* ===================================================================================== */
  /* External Functions                                                                    */
  /* ===================================================================================== */

  function count(address _address) external view returns (uint256 count) {
    (string memory alias_, bytes32 node_, ITextResolver res_) = _resolveOwner(_address);
    (string[] memory keys_, string[] memory values_) = _fetchNodeTextFields(traitKeys, node_, res_);
    return keys_.length;
  }

  function getData(address _address)
    external
    view
    returns (string[] memory keys, string[] memory values)
  {
    (string memory alias_, bytes32 node_, ITextResolver res_) = _resolveOwner(_address);
    (string[] memory keys_, string[] memory values_) = _fetchNodeTextFields(traitKeys, node_, res_);
    return (keys_, values_);
  }

  function getMetadata(address _address)
    external
    view
    returns (
      bytes32 node,
      string memory name,
      address resolver
    )
  {
    (string memory name, bytes32 node, ITextResolver resolver) = _resolveOwner(_address);
    return (node, name, address(resolver));
  }

  function getTextField(address _address, string memory _key)
    external
    view
    returns (string memory)
  {
    (, bytes32 node_, ITextResolver res_) = _resolveOwner(_address);
    return res_.text(node_, _key);
  }

  /* ===================================================================================== */
  /* Internal Functions                                                                    */
  /* ===================================================================================== */

  function _resolveOwner(address owner_)
    internal
    view
    returns (
      string memory,
      bytes32,
      ITextResolver
    )
  {
    bytes32 node_ = IReverseRegistrar(REVERSE_REGISTRAR).node(owner_);
    string memory _name = IDefaultReverseResolver(DEFAULT_REVERSE_RESOLVER).name(node_);
    (, bytes32 _node) = _name.dnsEncodeName();
    ITextResolver _resolver = ITextResolver(RESOLVER);
    return (_name, _node, _resolver);
  }

  function _fetchNodeTextFields(
    string[] memory _traits,
    bytes32 _node,
    ITextResolver _resolver
  ) internal view returns (string[] memory keys_, string[] memory values_) {
    string[] memory __keys = new string[](_traits.length);
    string[] memory __values = new string[](_traits.length);
    for (uint256 i = 0; i < _traits.length; i++) {
      __keys[i] = _traits[i];
      __values[i] = _resolver.text(_node, _traits[i]);
    }
    return (__keys, __values);
  }
}
