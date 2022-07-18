// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

import "hardhat/console.sol";
import { Base64 } from "base64-sol/base64.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";
import { svg } from "./libraries/SVG.sol";
import { svgUtils } from "./libraries/SVGUtils.sol";
import { SVGColor } from "./libraries/SVGColor.sol";
import { IMetadataSource } from "./interfaces/IMetadataSource.sol";
import { ISoulbound } from "./interfaces/ISoulbound.sol";
import { CitizenAlpha } from "./CitizenAlpha.sol";
import { DataENS } from "./Data/DataENS.sol";
import { SVGRender } from "./SVGRender.sol";

contract Metadata is Ownable {
  using Strings for address;
  using Strings for uint256;
  using Strings for uint8;

  address public token;
  address[] private _sources;

  address public svgRender;

  constructor(address _svgRender) {
    svgRender = _svgRender;
  }

  struct Metadata {
    string name;
    string description;
    string avatar;
    string did;
    string ensAlias;
    string ensNode;
    string ensResolver;
    string traits;
  }

  /* ===================================================================================== */
  /* External Functions                                                                    */
  /* ===================================================================================== */

  function appendSource(address source) external onlyOwner {
    _sources.push(source);
  }

  function getMetadata(address user) external view returns (Metadata memory) {
    return _getMetadata(user, CitizenAlpha(token).getId(user));
  }

  function setSource(uint256 idx, address source) external onlyOwner {
    require(idx < _sources.length, "MetadataGenerate:invalid-source-index");
    _sources[idx] = source;
  }

  function setToken(address token_) external onlyOwner {
    token = token_;
  }

  function setSVGRender(address svgRender_) external onlyOwner {
    svgRender = svgRender_;
  }

  function tokenURI(uint256 tokenId) external view returns (string memory) {
    return _constructTokenURI(tokenId);
  }

  /* ===================================================================================== */
  /* Internal Functions                                                                    */
  /* ===================================================================================== */

  function _constructTokenURI(uint256 _tokenId) internal view returns (string memory) {
    ISoulbound token_ = ISoulbound(token);
    Metadata memory _meta = _getMetadata(token_.ownerOf(_tokenId), _tokenId);

    return
      string(
        abi.encodePacked(
          "data:application/json;base64,",
          Base64.encode(
            bytes(
              string.concat(
                '{"name":',
                '"',
                _meta.name,
                '",',
                '"description":',
                '"',
                _meta.description,
                '",',
                '"image":',
                '"',
                _meta.avatar,
                '",',
                '"attributes": [',
                _meta.traits,
                "]",
                "}"
              )
            )
          )
        )
      );
  }

  function _getMetadata(address user, uint256 tokenId) internal view returns (Metadata memory) {
    ExternalMetadata memory externalMetadata_ = _getExternalMetadata(user, tokenId);
    string memory name_ = string(abi.encodePacked("Citizen #", tokenId.toString()));
    string memory description_ = bytes(externalMetadata_.ensAlias).length > 0
      ? externalMetadata_.ensAlias
      : Strings.toHexString(uint256(uint160(user)), 20);
    address link_ = ISoulbound(token).getLink(user);

    Metadata memory _meta = Metadata({
      name: name_,
      description: description_,
      avatar: externalMetadata_.avatar,
      did: externalMetadata_.did,
      ensNode: externalMetadata_.ensNode,
      ensAlias: externalMetadata_.ensAlias,
      ensResolver: externalMetadata_.ensResolver,
      traits: string.concat(
        externalMetadata_.traits,
        _generateTrait("link", Strings.toHexString(uint256(uint160(link_)), 20))
      )
    });

    return _meta;
  }

  struct ExternalMetadata {
    string avatar;
    string did;
    string ensNode;
    string ensAlias;
    string ensResolver;
    string traits;
  }

  function _getExternalMetadata(address user, uint256 _tokenId)
    internal
    view
    returns (ExternalMetadata memory)
  {
    /// @dev ENS resolver must always be in the first slot. TODO: make better
    DataENS _resolverEns = DataENS(_sources[0]);
    string memory did_ = _resolverEns.getTextField(user, "did");
    string memory avatar_ = _resolverEns.getTextField(user, "avatar");
    (bytes32 node, string memory alias_, address resolver_) = _resolverEns.getMetadata(user);
    string memory traits_ = _getUnwrappedTraits(user);
    return
      ExternalMetadata({
        avatar: _generateImage(avatar_, _tokenId, alias_),
        did: did_,
        ensNode: string(abi.encodePacked(node)),
        ensAlias: string(alias_),
        ensResolver: resolver_ != 0x0000000000000000000000000000000000000000
          ? Strings.toHexString(uint256(uint160(resolver_)), 20)
          : "",
        traits: traits_
      });
  }

  function _getUnwrappedTraits(address user) internal view returns (string memory) {
    uint256 count = 0;
    for (uint256 i = 0; i < _sources.length; i++) {
      IMetadataSource _source = IMetadataSource(_sources[i]);
      count = count + _source.count(user);
    }

    string[] memory keys_ = new string[](count);
    string[] memory values_ = new string[](count);

    uint256 __start;
    for (uint256 i = 0; i < _sources.length; i++) {
      IMetadataSource _source = IMetadataSource(_sources[i]);
      (string[] memory keys__, string[] memory values__) = _source.getData(user);
      for (uint256 k = __start; k < count; k++) {
        keys_[k] = (keys__[k]);
        values_[k] = values__[k];
      }
    }

    return _generateTraits(keys_, values_);
  }

  /* ===================================================================================== */
  /* Traits Functions                                                                      */
  /* ===================================================================================== */

  function _appendTrait(string memory _traits, string memory _traitAppending)
    internal
    view
    returns (string memory)
  {
    return string.concat(_traits, bytes(_traits).length > 0 ? "," : "", _traitAppending);
  }

  function _generateTrait(string memory _key, string memory _value)
    internal
    view
    returns (string memory __traits)
  {
    return string.concat('{"trait_type":' '"', _key, '",', '"value":', '"', _value, '"}');
  }

  function _generateTraits(string[] memory _keys, string[] memory _values)
    internal
    view
    returns (string memory __traits)
  {
    string memory _traits = "";
    for (uint256 i = 0; i < _keys.length; i++) {
      if (bytes(_values[i]).length > 0) {
        _traits = string.concat(_traits, _generateTrait(_keys[i], _values[i]), ",");
      }
    }
    return _traits;
  }

  function _generateImage(
    string memory _avatar,
    uint256 tokenId,
    string memory alias_
  ) internal view returns (string memory) {
    if (bytes(_avatar).length == 0) {
      return
        string(
          abi.encodePacked(
            "data:image/svg+xml;base64,",
            Base64.encode(bytes(SVGRender(svgRender).generate(tokenId, alias_)))
          )
        );
    }
    return _avatar;
  }
}
