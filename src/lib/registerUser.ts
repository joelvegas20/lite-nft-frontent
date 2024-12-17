import { fetchCallReadOnlyFunction, principalCV, stringAsciiCV } from '@stacks/transactions';
import { openContractCall } from '@stacks/connect';
import { userSession } from '@/lib/Wallet';
import { STACKS_TESTNET } from '@stacks/network';

export const registerUser = async () => {
  try {
    const userData = userSession.loadUserData();
    const userExist = await fetchCallReadOnlyFunction({
      contractName: 'auth-v2',
      contractAddress: 'ST3GBYD0VN28MAPDGNGTFNXQV5QJXQ3VCV3WZT75T',
      functionName: 'get-user-data',
      functionArgs: [principalCV(userData?.profile.stxAddress.testnet)],
      senderAddress: userData?.profile.stxAddress.testnet,
      network: STACKS_TESTNET,
    });
    if (userExist.type === "err") {
      console.log("User does not exist, registering user...");
      const result = await openContractCall({
        contractAddress: 'ST3GBYD0VN28MAPDGNGTFNXQV5QJXQ3VCV3WZT75T',
        contractName: 'auth-v2',
        functionName: 'login',
        functionArgs: [principalCV(userData?.profile.stxAddress.testnet), stringAsciiCV('https://cdn-icons-png.flaticon.com/512/10061/10061823.png')],
        senderKey: userSession.loadUserData().appPrivateKey,
        network: STACKS_TESTNET,
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
      contractName: 'auth-v2',
      contractAddress: 'ST3GBYD0VN28MAPDGNGTFNXQV5QJXQ3VCV3WZT75T',
      functionName: 'login',
      functionArgs: [principalCV(userData?.profile.stxAddress.testnet), stringAsciiCV(userData?.profile.stxAddress.testnet)],
      senderAddress: userData?.profile.stxAddress.testnet,
      network: STACKS_TESTNET,
    });
    return result;
  } catch (error) {
    console.error("Error in registerUser:", error);
    console.log(error)
    throw error; // Re-throw the error to be handled by the caller
    return null;
  }
};