```
 _    _      _      _____   _____ _ _   _
| |  | |    | |    |____ | /  __ (_) | (_)
| |  | | ___| |__      / / | /  \/_| |_ _ _______ _ __
| |/\| |/ _ \ '_ \     \ \ | |   | | __| |_  / _ \ '_ \
\  /\  /  __/ |_) |.___/ / | \__/\ | |_| |/ /  __/ | | |
 \/  \/ \___|_.__/ \____/   \____/_|\__|_/___\___|_| |_|
```

# Core Smart Contracts

![TS](https://badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](http://perso.crans.org/besson/LICENSE.html)

```sh
cp .envrc.example .envrc
```

# Installation

Install the repo and dependencies by running:
`yarn`

## Deployment

These contracts can be deployed to a network by running:
`yarn deploy <networkName>`

## Verification

These contracts can be verified on Etherscan, or an Etherscan clone, for example (Polygonscan) by running:
`yarn etherscan-verify <ethereum network name>` or `yarn etherscan-verify-polygon matic`

# Testing

Run the unit tests locally with:
`yarn test`

## Coverage

Generate the test coverage report with:
`yarn coverage`
