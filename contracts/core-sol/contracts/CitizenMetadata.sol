// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.6;

import { Base64 } from "base64-sol/base64.sol";
import { ISoulbound } from "./interfaces/ISoulbound.sol";
import { CitizenAlpha } from "./CitizenAlpha.sol";
import { MetadataResolver } from "./MetadataResolver.sol";

contract CitizenMetadata is MetadataResolver {
  constructor(address _svgColor) MetadataResolver(_svgColor) {}

  /* ===================================================================================== */
  /* External Functions                                                                    */
  /* ===================================================================================== */

  function tokenURI(uint256 tokenId) external view returns (string memory) {
    return _constructTokenURI(tokenId);
  }

  /* ===================================================================================== */
  /* Internal Functions                                                                    */
  /* ===================================================================================== */

  function _constructTokenURI(uint256 _tokenId) internal view returns (string memory) {
    ISoulbound token_ = ISoulbound(_token);
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
}
