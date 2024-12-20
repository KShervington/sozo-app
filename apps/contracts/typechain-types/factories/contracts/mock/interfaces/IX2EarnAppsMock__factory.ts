/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IX2EarnAppsMock,
  IX2EarnAppsMockInterface,
} from "../../../../contracts/mock/interfaces/IX2EarnAppsMock";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "appId",
        type: "bytes32",
      },
    ],
    name: "X2EarnAppAlreadyExists",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "X2EarnInvalidAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "appId",
        type: "bytes32",
      },
    ],
    name: "X2EarnMaxRewardDistributorsReached",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "appId",
        type: "bytes32",
      },
    ],
    name: "X2EarnNonexistentApp",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "appId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "distributorAddress",
        type: "address",
      },
    ],
    name: "X2EarnNonexistentRewardDistributor",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "X2EarnUnauthorizedUser",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "appAvailableForAllocationVoting",
        type: "bool",
      },
    ],
    name: "AppAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "appId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "oldAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AppAdminUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "appId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "distributorAddress",
        type: "address",
      },
    ],
    name: "RewardDistributorAddedToApp",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "appId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "distributorAddress",
        type: "address",
      },
    ],
    name: "RewardDistributorRemovedFromApp",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "appId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "oldTeamWalletAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newTeamWalletAddress",
        type: "address",
      },
    ],
    name: "TeamWalletAddressUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "teamWalletAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        internalType: "string",
        name: "appName",
        type: "string",
      },
    ],
    name: "addApp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "appId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "distributorAddress",
        type: "address",
      },
    ],
    name: "addRewardDistributor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "appId",
        type: "bytes32",
      },
    ],
    name: "appExists",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "appId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "isAppAdmin",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "appId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "distributorAddress",
        type: "address",
      },
    ],
    name: "isRewardDistributor",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "appId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "distributorAddress",
        type: "address",
      },
    ],
    name: "removeRewardDistributor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "appId",
        type: "bytes32",
      },
    ],
    name: "teamWalletAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IX2EarnAppsMock__factory {
  static readonly abi = _abi;
  static createInterface(): IX2EarnAppsMockInterface {
    return new Interface(_abi) as IX2EarnAppsMockInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IX2EarnAppsMock {
    return new Contract(address, _abi, runner) as unknown as IX2EarnAppsMock;
  }
}
