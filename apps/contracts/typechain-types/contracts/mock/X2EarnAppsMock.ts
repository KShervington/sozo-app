/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export interface X2EarnAppsMockInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "MAX_MODERATORS"
      | "MAX_REWARD_DISTRIBUTORS"
      | "addApp"
      | "addRewardDistributor"
      | "appExists"
      | "hashAppName"
      | "isAppAdmin"
      | "isRewardDistributor"
      | "removeRewardDistributor"
      | "setAppAdmin"
      | "teamWalletAddress"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "AppAdded"
      | "AppAdminUpdated"
      | "RewardDistributorAddedToApp"
      | "RewardDistributorRemovedFromApp"
      | "TeamWalletAddressUpdated"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "MAX_MODERATORS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MAX_REWARD_DISTRIBUTORS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addApp",
    values: [AddressLike, AddressLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "addRewardDistributor",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "appExists",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "hashAppName", values: [string]): string;
  encodeFunctionData(
    functionFragment: "isAppAdmin",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isRewardDistributor",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "removeRewardDistributor",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setAppAdmin",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "teamWalletAddress",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "MAX_MODERATORS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MAX_REWARD_DISTRIBUTORS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "addApp", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "addRewardDistributor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "appExists", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "hashAppName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isAppAdmin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isRewardDistributor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeRewardDistributor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAppAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "teamWalletAddress",
    data: BytesLike
  ): Result;
}

export namespace AppAddedEvent {
  export type InputTuple = [
    id: BytesLike,
    addr: AddressLike,
    name: string,
    appAvailableForAllocationVoting: boolean
  ];
  export type OutputTuple = [
    id: string,
    addr: string,
    name: string,
    appAvailableForAllocationVoting: boolean
  ];
  export interface OutputObject {
    id: string;
    addr: string;
    name: string;
    appAvailableForAllocationVoting: boolean;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace AppAdminUpdatedEvent {
  export type InputTuple = [
    appId: BytesLike,
    oldAdmin: AddressLike,
    newAdmin: AddressLike
  ];
  export type OutputTuple = [appId: string, oldAdmin: string, newAdmin: string];
  export interface OutputObject {
    appId: string;
    oldAdmin: string;
    newAdmin: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RewardDistributorAddedToAppEvent {
  export type InputTuple = [appId: BytesLike, distributorAddress: AddressLike];
  export type OutputTuple = [appId: string, distributorAddress: string];
  export interface OutputObject {
    appId: string;
    distributorAddress: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RewardDistributorRemovedFromAppEvent {
  export type InputTuple = [appId: BytesLike, distributorAddress: AddressLike];
  export type OutputTuple = [appId: string, distributorAddress: string];
  export interface OutputObject {
    appId: string;
    distributorAddress: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TeamWalletAddressUpdatedEvent {
  export type InputTuple = [
    appId: BytesLike,
    oldTeamWalletAddress: AddressLike,
    newTeamWalletAddress: AddressLike
  ];
  export type OutputTuple = [
    appId: string,
    oldTeamWalletAddress: string,
    newTeamWalletAddress: string
  ];
  export interface OutputObject {
    appId: string;
    oldTeamWalletAddress: string;
    newTeamWalletAddress: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface X2EarnAppsMock extends BaseContract {
  connect(runner?: ContractRunner | null): X2EarnAppsMock;
  waitForDeployment(): Promise<this>;

  interface: X2EarnAppsMockInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  MAX_MODERATORS: TypedContractMethod<[], [bigint], "view">;

  MAX_REWARD_DISTRIBUTORS: TypedContractMethod<[], [bigint], "view">;

  addApp: TypedContractMethod<
    [_teamWalletAddress: AddressLike, _admin: AddressLike, _appName: string],
    [void],
    "nonpayable"
  >;

  addRewardDistributor: TypedContractMethod<
    [_appId: BytesLike, _distributor: AddressLike],
    [void],
    "nonpayable"
  >;

  appExists: TypedContractMethod<[appId: BytesLike], [boolean], "view">;

  hashAppName: TypedContractMethod<[appName: string], [string], "view">;

  isAppAdmin: TypedContractMethod<
    [appId: BytesLike, account: AddressLike],
    [boolean],
    "view"
  >;

  isRewardDistributor: TypedContractMethod<
    [appId: BytesLike, account: AddressLike],
    [boolean],
    "view"
  >;

  removeRewardDistributor: TypedContractMethod<
    [_appId: BytesLike, _distributor: AddressLike],
    [void],
    "nonpayable"
  >;

  setAppAdmin: TypedContractMethod<
    [_appId: BytesLike, _newAdmin: AddressLike],
    [void],
    "nonpayable"
  >;

  teamWalletAddress: TypedContractMethod<[appId: BytesLike], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "MAX_MODERATORS"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "MAX_REWARD_DISTRIBUTORS"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "addApp"
  ): TypedContractMethod<
    [_teamWalletAddress: AddressLike, _admin: AddressLike, _appName: string],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "addRewardDistributor"
  ): TypedContractMethod<
    [_appId: BytesLike, _distributor: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "appExists"
  ): TypedContractMethod<[appId: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "hashAppName"
  ): TypedContractMethod<[appName: string], [string], "view">;
  getFunction(
    nameOrSignature: "isAppAdmin"
  ): TypedContractMethod<
    [appId: BytesLike, account: AddressLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "isRewardDistributor"
  ): TypedContractMethod<
    [appId: BytesLike, account: AddressLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "removeRewardDistributor"
  ): TypedContractMethod<
    [_appId: BytesLike, _distributor: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setAppAdmin"
  ): TypedContractMethod<
    [_appId: BytesLike, _newAdmin: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "teamWalletAddress"
  ): TypedContractMethod<[appId: BytesLike], [string], "view">;

  getEvent(
    key: "AppAdded"
  ): TypedContractEvent<
    AppAddedEvent.InputTuple,
    AppAddedEvent.OutputTuple,
    AppAddedEvent.OutputObject
  >;
  getEvent(
    key: "AppAdminUpdated"
  ): TypedContractEvent<
    AppAdminUpdatedEvent.InputTuple,
    AppAdminUpdatedEvent.OutputTuple,
    AppAdminUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "RewardDistributorAddedToApp"
  ): TypedContractEvent<
    RewardDistributorAddedToAppEvent.InputTuple,
    RewardDistributorAddedToAppEvent.OutputTuple,
    RewardDistributorAddedToAppEvent.OutputObject
  >;
  getEvent(
    key: "RewardDistributorRemovedFromApp"
  ): TypedContractEvent<
    RewardDistributorRemovedFromAppEvent.InputTuple,
    RewardDistributorRemovedFromAppEvent.OutputTuple,
    RewardDistributorRemovedFromAppEvent.OutputObject
  >;
  getEvent(
    key: "TeamWalletAddressUpdated"
  ): TypedContractEvent<
    TeamWalletAddressUpdatedEvent.InputTuple,
    TeamWalletAddressUpdatedEvent.OutputTuple,
    TeamWalletAddressUpdatedEvent.OutputObject
  >;

  filters: {
    "AppAdded(bytes32,address,string,bool)": TypedContractEvent<
      AppAddedEvent.InputTuple,
      AppAddedEvent.OutputTuple,
      AppAddedEvent.OutputObject
    >;
    AppAdded: TypedContractEvent<
      AppAddedEvent.InputTuple,
      AppAddedEvent.OutputTuple,
      AppAddedEvent.OutputObject
    >;

    "AppAdminUpdated(bytes32,address,address)": TypedContractEvent<
      AppAdminUpdatedEvent.InputTuple,
      AppAdminUpdatedEvent.OutputTuple,
      AppAdminUpdatedEvent.OutputObject
    >;
    AppAdminUpdated: TypedContractEvent<
      AppAdminUpdatedEvent.InputTuple,
      AppAdminUpdatedEvent.OutputTuple,
      AppAdminUpdatedEvent.OutputObject
    >;

    "RewardDistributorAddedToApp(bytes32,address)": TypedContractEvent<
      RewardDistributorAddedToAppEvent.InputTuple,
      RewardDistributorAddedToAppEvent.OutputTuple,
      RewardDistributorAddedToAppEvent.OutputObject
    >;
    RewardDistributorAddedToApp: TypedContractEvent<
      RewardDistributorAddedToAppEvent.InputTuple,
      RewardDistributorAddedToAppEvent.OutputTuple,
      RewardDistributorAddedToAppEvent.OutputObject
    >;

    "RewardDistributorRemovedFromApp(bytes32,address)": TypedContractEvent<
      RewardDistributorRemovedFromAppEvent.InputTuple,
      RewardDistributorRemovedFromAppEvent.OutputTuple,
      RewardDistributorRemovedFromAppEvent.OutputObject
    >;
    RewardDistributorRemovedFromApp: TypedContractEvent<
      RewardDistributorRemovedFromAppEvent.InputTuple,
      RewardDistributorRemovedFromAppEvent.OutputTuple,
      RewardDistributorRemovedFromAppEvent.OutputObject
    >;

    "TeamWalletAddressUpdated(bytes32,address,address)": TypedContractEvent<
      TeamWalletAddressUpdatedEvent.InputTuple,
      TeamWalletAddressUpdatedEvent.OutputTuple,
      TeamWalletAddressUpdatedEvent.OutputObject
    >;
    TeamWalletAddressUpdated: TypedContractEvent<
      TeamWalletAddressUpdatedEvent.InputTuple,
      TeamWalletAddressUpdatedEvent.OutputTuple,
      TeamWalletAddressUpdatedEvent.OutputObject
    >;
  };
}
