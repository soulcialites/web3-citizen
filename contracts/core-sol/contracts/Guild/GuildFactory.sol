// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Guild } from "./Guild.sol";

contract GuildFactory is Ownable {
  function createGuild() external returns (address guild) {
    return (address(new Guild(0x0000000000000000000000000000000000000000)));
  }
}
