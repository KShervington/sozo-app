/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  BytesLike,
  BigNumberish,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { EcoEarn, EcoEarnInterface } from "../../contracts/EcoEarn";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
      {
        internalType: "address",
        name: "_x2EarnRewardsPoolContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_cycleDuration",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxSubmissionsPerCycle",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_appId",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AccessControlBadConfirmation",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "neededRole",
        type: "bytes32",
      },
    ],
    name: "AccessControlUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "cycle",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ClaimedAllocation",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newDuration",
        type: "uint256",
      },
    ],
    name: "CycleDurationUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "cycleStartBlock",
        type: "uint256",
      },
    ],
    name: "CycleStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "participant",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Submission",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "appId",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cycleDuration",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentCycle",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNextCycleBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
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
        internalType: "address",
        name: "participant",
        type: "address",
      },
    ],
    name: "isUserMaxSubmissionsReached",
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
    inputs: [],
    name: "lastCycleStartBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxSubmissionsPerCycle",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextCycle",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "participant",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "registerValidSubmission",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "callerConfirmation",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "rewards",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "rewardsLeft",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_appId",
        type: "bytes32",
      },
    ],
    name: "setAppId",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_maxSubmissionsPerCycle",
        type: "uint256",
      },
    ],
    name: "setMaxSubmissionsPerCycle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nextCycle",
        type: "uint256",
      },
    ],
    name: "setNextCycle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "setRewardsAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "submissions",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "totalSubmissions",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "triggerCycle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "cycle",
        type: "uint256",
      },
    ],
    name: "withdrawRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "x2EarnRewardsPoolContract",
    outputs: [
      {
        internalType: "contract IX2EarnRewardsPool",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620013dc380380620013dc83398101604081905262000034916200024b565b6001600160a01b038516620000ab5760405162461bcd60e51b815260206004820152603260248201527f45636f4561726e3a205f61646d696e20616464726573732063616e6e6f7420626044820152716520746865207a65726f206164647265737360701b60648201526084015b60405180910390fd5b6001600160a01b038416620001395760405162461bcd60e51b815260206004820152604760248201527f45636f456561726e3a2078324561726e52657761726473506f6f6c20636f6e7460448201527f7261637420616464726573732063616e6e6f7420626520746865207a65726f206064820152666164647265737360c81b608482015260a401620000a2565b600180546001600160a01b0319166001600160a01b03861617815560078390556008849055600a556002819055620001736000866200017f565b5050505050506200029e565b6000828152602081815260408083206001600160a01b038516845290915281205460ff1662000224576000838152602081815260408083206001600160a01b03861684529091529020805460ff19166001179055620001db3390565b6001600160a01b0316826001600160a01b0316847f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a450600162000228565b5060005b92915050565b80516001600160a01b03811681146200024657600080fd5b919050565b600080600080600060a086880312156200026457600080fd5b6200026f866200022e565b94506200027f602087016200022e565b6040870151606088015160809098015196999198509695945092505050565b61112e80620002ae6000396000f3fe608060405234801561001057600080fd5b50600436106101a95760003560e01c806378850c68116100f9578063a217fddf11610097578063d547741f11610071578063d547741f14610377578063da9cb3371461038a578063f301af421461039d578063f5b3734f146103bd57600080fd5b8063a217fddf14610354578063b9f816721461035c578063be26ed7f1461036f57600080fd5b80639342c8f4116100d35780639342c8f414610308578063998ed3111461031b5780639a6d7afb1461032e578063a20d422b1461034157600080fd5b806378850c68146102cc57806380afdea8146102ec57806391d14854146102f557600080fd5b806336568abe116101665780635da2c0d0116101405780635da2c0d0146102875780636a1347d7146102b25780636a2b7672146102ba5780636b6923b8146102c357600080fd5b806336568abe146102585780633ad4f02a1461026b5780635bec4cb41461027e57600080fd5b806301ffc9a7146101ae5780630e4dbf5c146101d657806321651e711461020f578063248a9ca3146102185780632f2ff15d1461023b5780633244620314610250575b600080fd5b6101c16101bc366004610ee2565b6103dd565b60405190151581526020015b60405180910390f35b6102016101e4366004610f2f565b600560209081526000928352604080842090915290825290205481565b6040519081526020016101cd565b61020160075481565b610201610226366004610f5b565b60009081526020819052604090206001015490565b61024e610249366004610f2f565b610414565b005b61020161043f565b61024e610266366004610f2f565b610456565b61024e610279366004610f5b565b61048e565b61020160085481565b60015461029a906001600160a01b031681565b6040516001600160a01b0390911681526020016101cd565b61024e61049f565b61020160095481565b610201600a5481565b6102016102da366004610f5b565b60066020526000908152604090205481565b61020160025481565b6101c1610303366004610f2f565b610501565b61024e610316366004610f5b565b61052a565b61024e610329366004610f5b565b610695565b61024e61033c366004610f5b565b6107ea565b61024e61034f366004610f74565b610871565b610201600081565b61024e61036a366004610f5b565b610b9d565b610201610bae565b61024e610385366004610f2f565b610bbf565b6101c1610398366004610f9e565b610be4565b6102016103ab366004610f5b565b60036020526000908152604090205481565b6102016103cb366004610f5b565b60046020526000908152604090205481565b60006001600160e01b03198216637965db0b60e01b148061040e57506301ffc9a760e01b6001600160e01b03198316145b92915050565b60008281526020819052604090206001015461042f81610c30565b6104398383610c3d565b50505050565b60006008546009546104519190610fcf565b905090565b6001600160a01b038116331461047f5760405163334bd91960e11b815260040160405180910390fd5b6104898282610ccf565b505050565b600061049981610c30565b50600255565b60006104aa81610c30565b43600955600a80549060006104be83610fe2565b91905055507fc8a0332abe200b5e7ff117e01b27b1ea7e989a7152ad8690ca1e0f0cb1157c3f6009546040516104f691815260200190565b60405180910390a150565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b600061053581610c30565b6000828152600360205260409020546105955760405162461bcd60e51b815260206004820152601f60248201527f45636f4561726e3a204e6f207265776172647320746f2077697468647261770060448201526064015b60405180910390fd5b61059d610bae565b82106105eb5760405162461bcd60e51b815260206004820152601a60248201527f45636f4561726e3a204379636c65206973206e6f74206f766572000000000000604482015260640161058c565b600082815260046020526040812080549190556001546002546001600160a01b039091169063cfe706b390839061062187610d3a565b604051602001610631919061101f565b6040516020818303038152906040526040518463ffffffff1660e01b815260040161065e93929190611075565b600060405180830381600087803b15801561067857600080fd5b505af115801561068c573d6000803e3d6000fd5b50505050505050565b60006106a081610c30565b600154600254604051633c9d10cd60e21b81526001600160a01b039092169163f2744334916106d59160040190815260200190565b602060405180830381865afa1580156106f2573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061071691906110b6565b82111561078b5760405162461bcd60e51b815260206004820152603f60248201527f45636f4561726e3a20496e73756666696369656e742062616c616e6365206f6e60448201527f207468652058324561726e52657761726473506f6f6c20636f6e747261637400606482015260840161058c565b600a805460009081526003602090815260408083208690558354835260048252918290208590559154905184815290917fdce1a4cab135b70d769c81ff2f5992e5edb3949b60a3ea7af270705059f4ea76910160405180910390a25050565b60006107f581610c30565b6000821161086b5760405162461bcd60e51b815260206004820152603960248201527f45636f4561726e3a204d6178207375626d697373696f6e73207065722063796360448201527f6c65206d7573742062652067726561746572207468616e203000000000000000606482015260840161058c565b50600755565b600061087c81610c30565b600082116108db5760405162461bcd60e51b815260206004820152602660248201527f45636f4561726e3a20416d6f756e74206d75737420626520677265617465722060448201526507468616e20360d41b606482015260840161058c565b600754600560006108ea610bae565b81526020019081526020016000206000856001600160a01b03166001600160a01b03168152602001908152602001600020541061097b5760405162461bcd60e51b815260206004820152602960248201527f45636f4561726e3a204d6178207375626d697373696f6e7320706572207573656044820152681c881c995858da195960ba1b606482015260840161058c565b8160046000610988610bae565b81526020019081526020016000205410156109e55760405162461bcd60e51b815260206004820181905260248201527f45636f4561726e3a204e6f7420656e6f7567682072657761726473206c656674604482015260640161058c565b6109ed61043f565b4310610a345760405162461bcd60e51b815260206004820152601660248201527522b1b7a2b0b9371d1021bcb1b6329034b99037bb32b960511b604482015260640161058c565b60056000610a40610bae565b8152602080820192909252604090810160009081206001600160a01b03871682529092528120805491610a7283610fe2565b919050555060066000610a83610bae565b81526020019081526020016000206000815480929190610aa290610fe2565b91905055508160046000610ab4610bae565b81526020019081526020016000206000828254610ad191906110cf565b909155505060015460025460405163f7335f1160e01b81526004810191909152602481018490526001600160a01b03858116604483015260806064830152600060848301529091169063f7335f119060a401600060405180830381600087803b158015610b3d57600080fd5b505af1158015610b51573d6000803e3d6000fd5b50505050826001600160a01b03167f7353684080cb3af2a27a8f7a2ea1d406494bd8e78dadcfad3519da376da14bfb83604051610b9091815260200190565b60405180910390a2505050565b6000610ba881610c30565b50600a55565b60006001600a5461045191906110cf565b600082815260208190526040902060010154610bda81610c30565b6104398383610ccf565b600060075460056000610bf5610bae565b81526020019081526020016000206000846001600160a01b03166001600160a01b031681526020019081526020016000205410159050919050565b610c3a8133610dcd565b50565b6000610c498383610501565b610cc7576000838152602081815260408083206001600160a01b03861684529091529020805460ff19166001179055610c7f3390565b6001600160a01b0316826001600160a01b0316847f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a450600161040e565b50600061040e565b6000610cdb8383610501565b15610cc7576000838152602081815260408083206001600160a01b0386168085529252808320805460ff1916905551339286917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a450600161040e565b60606000610d4783610e0a565b600101905060008167ffffffffffffffff811115610d6757610d676110e2565b6040519080825280601f01601f191660200182016040528015610d91576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a8504945084610d9b57509392505050565b610dd78282610501565b610e065760405163e2517d3f60e01b81526001600160a01b03821660048201526024810183905260440161058c565b5050565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8310610e495772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef81000000008310610e75576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc100008310610e9357662386f26fc10000830492506010015b6305f5e1008310610eab576305f5e100830492506008015b6127108310610ebf57612710830492506004015b60648310610ed1576064830492506002015b600a831061040e5760010192915050565b600060208284031215610ef457600080fd5b81356001600160e01b031981168114610f0c57600080fd5b9392505050565b80356001600160a01b0381168114610f2a57600080fd5b919050565b60008060408385031215610f4257600080fd5b82359150610f5260208401610f13565b90509250929050565b600060208284031215610f6d57600080fd5b5035919050565b60008060408385031215610f8757600080fd5b610f9083610f13565b946020939093013593505050565b600060208284031215610fb057600080fd5b610f0c82610f13565b634e487b7160e01b600052601160045260246000fd5b8082018082111561040e5761040e610fb9565b600060018201610ff457610ff4610fb9565b5060010190565b60005b83811015611016578181015183820152602001610ffe565b50506000910152565b7f5769746864726177732072656d61696e696e672072657761726473206f6620638152673cb1b6329037391760c11b602082015260008251611068816028850160208701610ffb565b9190910160280192915050565b83815282602082015260606040820152600082518060608401526110a0816080850160208701610ffb565b601f01601f191691909101608001949350505050565b6000602082840312156110c857600080fd5b5051919050565b8181038181111561040e5761040e610fb9565b634e487b7160e01b600052604160045260246000fdfea264697066735822122083f9f939cc009934cc463176568f0cefb8a0f2a3c7c6dbcae038f45488649ec064736f6c63430008140033";

type EcoEarnConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: EcoEarnConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class EcoEarn__factory extends ContractFactory {
  constructor(...args: EcoEarnConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _admin: AddressLike,
    _x2EarnRewardsPoolContract: AddressLike,
    _cycleDuration: BigNumberish,
    _maxSubmissionsPerCycle: BigNumberish,
    _appId: BytesLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _admin,
      _x2EarnRewardsPoolContract,
      _cycleDuration,
      _maxSubmissionsPerCycle,
      _appId,
      overrides || {}
    );
  }
  override deploy(
    _admin: AddressLike,
    _x2EarnRewardsPoolContract: AddressLike,
    _cycleDuration: BigNumberish,
    _maxSubmissionsPerCycle: BigNumberish,
    _appId: BytesLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      _admin,
      _x2EarnRewardsPoolContract,
      _cycleDuration,
      _maxSubmissionsPerCycle,
      _appId,
      overrides || {}
    ) as Promise<
      EcoEarn & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): EcoEarn__factory {
    return super.connect(runner) as EcoEarn__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EcoEarnInterface {
    return new Interface(_abi) as EcoEarnInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): EcoEarn {
    return new Contract(address, _abi, runner) as unknown as EcoEarn;
  }
}
