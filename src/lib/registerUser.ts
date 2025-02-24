import {fetchCallReadOnlyFunction, principalCV, stringUtf8CV} from '@stacks/transactions';
import { openContractCall } from '@stacks/connect';
import { userSession } from '@/lib/Wallet';
import {ContractName, Contracts, Stacks} from "@config/config.keys";

export const registerUser = async () => {
  try {
    const userData = userSession.loadUserData();
    const userExist = await fetchCallReadOnlyFunction({
      contractName: Contracts[ContractName.AUTH].name,
      contractAddress: Contracts[ContractName.AUTH].address,
      functionName: 'get-user-data',
      functionArgs: [principalCV(userData?.profile.stxAddress.testnet)],
      senderAddress: userData?.profile.stxAddress.testnet,
      network: Stacks.network,
    });
    if (userExist.type === "err") {
      console.log("User does not exist, registering user...");
      const result = await openContractCall({
        contractAddress: Contracts[ContractName.AUTH].address,
        contractName: Contracts[ContractName.AUTH].name,
        functionName: 'login',
        functionArgs: [principalCV(userData?.profile.stxAddress.testnet), stringUtf8CV('gen-from-'+userData?.profile.stxAddress.testnet)],
        senderKey: userSession.loadUserData().appPrivateKey,
        network: Stacks.network,
        onCancel: () => {
          userSession.signUserOut();
        },
        onFinish: (payload) => {
          console.log("User registered successfully with the following payload: ", payload);

        }
      });
      console.log("User registered successfully with the following result: ", result);
      return result;
    }
    const result = await fetchCallReadOnlyFunction({
      contractAddress: Contracts[ContractName.AUTH].address,
      contractName: Contracts[ContractName.AUTH].name,
      functionName: 'login',
      functionArgs: [principalCV(userData?.profile.stxAddress.testnet), stringUtf8CV(userData?.profile.stxAddress.testnet)],
      senderAddress: userData?.profile.stxAddress.testnet,
      network: Stacks.network,
    });
    return result;
  } catch (error) {
    console.error("Error in registerUser:", error);
    console.log(error)
    throw error; // Re-throw the error to be handled by the caller
    return null;
  }
};