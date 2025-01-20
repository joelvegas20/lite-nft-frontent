import { StacksNetwork } from "@stacks/network";

/**
 * @description Enum for Stacks Config
 * @enum {string}
 * @readonly
 */
export enum StacksConfig {
    NETWORK = "NEXT_PUBLIC_STACKS_NETWORK",
}

/**
 * @description Enum for contract names
 * @enum {string}
 * @readonly
 */
export enum ContractName {
  AUTH = "NEXT_PUBLIC_STACKS_CONTRACT_VERSION_AUTH",
  COLLECTION = "NEXT_PUBLIC_STACKS_CONTRACT_VERSION_COLLECTION",
}

/**
 * @description Enum for environment variables of contract addresses
 * @enum {string}
 * @readonly
 */
export enum ContractAddress {
  AUTH = "NEXT_PUBLIC_STACKS_CONTRACT_ADDRESS_AUTH",
  COLLECTION = "NEXT_PUBLIC_STACKS_CONTRACT_ADDRESS_COLLECTION",
}

/**
 * @description Enum for method names of each contract
 * @enum {string}
 * @readonly
 */
export enum ContractMethods {
  AUTH_LOGIN = "login",
  AUTH_REGISTER = "register",
  COLLECTION_CREATE = "createCollection",
  COLLECTION_ADD_ITEM = "addItem",
}

/**
 * @description Type for contract configuration
 */
export interface ContractConfig {
  name: string;
  address: string;
  methods: { [key: string]: string };
}

/**
 * @description Contracts configuration object
 */
export const Contracts: Record<ContractName, ContractConfig> = {
  [ContractName.AUTH]: {
    name: process.env[ContractName.AUTH] || "",
    address: process.env[ContractAddress.AUTH] || "",
    methods: {
      login: ContractMethods.AUTH_LOGIN,
      register: ContractMethods.AUTH_REGISTER,
    },
  },
  [ContractName.COLLECTION]: {
    name: process.env[ContractName.COLLECTION] || "",
    address: process.env[ContractAddress.COLLECTION] || "",
    methods: {
      createCollection: ContractMethods.COLLECTION_CREATE,
      addItem: ContractMethods.COLLECTION_ADD_ITEM,
    },
  },
};

/**
 * @description Type for contract configuration
 */
export interface StacksConfiguration {
  network: StacksNetwork;
}

/**
 * @description Stacks configuration object
 */
export const Stacks: StacksConfiguration = {
  network: process.env[StacksConfig.NETWORK] as unknown as StacksNetwork,
};
