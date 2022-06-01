# Sample

This repository includes a complete project structure for AssemblyScript contracts targeting the NEAR platform.

The example here is very basic.  It's a simple contract demonstrating the following concepts:
- a single contract
- the difference between `view` vs. `change` methods
- basic contract storage

The goal of this repository is to make it as easy as possible to get started writing unit tests for AssemblyScript contracts built to work with NEAR Protocol.

## Usage

### Getting started

1. clone this repo to a local folder
2. run `yarn`
3. run `yarn install`
4. run `yarn test`

### Top-level `yarn` commands

- run `yarn test` to run all tests
  - (!) be sure to run `yarn build:release` at least once before:
    - run `yarn test:unit` to run only unit tests
- run `yarn build` to quickly verify build status
- run `yarn deploy` to quickly run the `./scripts/1.deploy.sh` command to deploy smart contract
- run `yarn clean` to clean up build folder

### Other documentation

- tour contract and test documentation
  - see `/src/tour/README` for contract interface
  - see `/src/tour/__tests__/README` for tour unit testing details
  - see `/scripts/README` for running scripts


### Contracts and Unit Tests

```txt
src
├── tour                        <-- tour contract
│   ├── README.md
│   ├── __tests__
│   │   ├── README.md
│   │   └── index.unit.spec.ts
│   └── assembly
│       └── index.ts
|       └── models
|            └── commentModel.ts
|            └── rateModel.ts
|            └── tourModel.ts
|
└── utils.ts                      <-- shared contract code
```

### Helper Scripts

```txt
scripts
├── 1.deploy.sh
├── 2.create_tour.sh
├── 3.get_tour.sh
├── 4.get_tours.sh
├── 5.buy_tour.sh
├── 6.update_tour.sh
├── 7.like_tour.sh
├── 8.dislike_tour.sh
├── 9.comment_on_tour.sh
├── 10.rate_tour.sh
├── 11.delete_tour.sh
└── README.md                     <-- instructions
```
## Deployed Contract Link
[Check out the deployed Smart Contract on explorer.testnet.near.org](https://explorer.testnet.near.org/transactions/4Y8PBn45mJtyDD4ir1aopPkMNqZdfC2hwJrXhTxAi7cA)