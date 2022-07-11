# Web3 Citizen

![TS](https://badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)
[![GPLv3 license](https://img.shields.io/badge/License-MIT-blue.svg)](http://perso.crans.org/besson/LICENSE.html)

The Web3 CitizenAlpha contract is a Web3 of Trust experiment.

## 🗺️ Overview:

CitizenAlpha (Beta) is an experiment for bootstrapping a Decentralized Society. Combining on-chain permissions and off-chain data (ENS text fields i.e. DIDs, pointers, etc...)

CitizenAlpha is an attempt to better understand Web3 of Trust mechanics. Simple in nature, the contract is only responsible for issuing/revoking of soulbounds. Metadata is generated via an external contract: allowing on-going updates during the Beta.

## 🏗️ Architecture:

- Citizens:
  - Issue Citizenship
- Founders:
  - Issue Citizenship
  - Revoke Citizenship
- Admin:
  - Issue Citizenship
  - Revoke Citizenship
  - Add Founder
  - Remover Founder
