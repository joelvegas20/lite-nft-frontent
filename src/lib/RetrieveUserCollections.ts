import { userSession } from "@/lib/Wallet";
import { ClarityValue, cvToValue, fetchCallReadOnlyFunction } from "@stacks/transactions";


export const RetrieveUserCollection = async () => {
  const collectionNames: { id: "", name: "" }[] = [];
  const userData = userSession.loadUserData();
  try {
    const data = await fetchCallReadOnlyFunction({
      contractName: 'collection-v5',
      contractAddress: 'ST3GBYD0VN28MAPDGNGTFNXQV5QJXQ3VCV3WZT75T',
      functionName: 'get-collections-by-owner',
      functionArgs: [],
      senderAddress: userData?.profile.stxAddress.testnet,
      network: 'testnet',
    });
    (cvToValue(data) as Array<ClarityValue>).forEach((value) => {
      const wrapperOfValues: any = (value as any).value;
      collectionNames.push({ id: wrapperOfValues.id.value, name: wrapperOfValues.name.value });
    });
    return collectionNames;
  } catch (error) {
    console.error("Error at retrieval collection names: ", error);
    return [];
  }
};