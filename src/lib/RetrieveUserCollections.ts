import { userSession } from "@/lib/Wallet";
import { ClarityValue, cvToValue, fetchCallReadOnlyFunction } from "@stacks/transactions";
import {ContractName, Contracts, Stacks} from "@config/config.keys";

type Collections = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  logo: string;
}[];

export const RetrieveUserCollection = async () => {
  const collectionNames: Collections = [];
  const userData = userSession.loadUserData();
  try {
    const data = await fetchCallReadOnlyFunction({
      contractName: Contracts[ContractName.COLLECTION].name,
      contractAddress: Contracts[ContractName.COLLECTION].address,
      functionName: 'get-collections-by-owner',
      functionArgs: [],
      senderAddress: userData?.profile.stxAddress.testnet,
      network:  Stacks.network,
    });
    (cvToValue(data) as Array<ClarityValue>).forEach((value) => {
      const wrapperOfValues: any = (value as any).value;
      collectionNames.push({ 
        id: wrapperOfValues.id.value, 
        name: wrapperOfValues.name.value, 
        description: wrapperOfValues.description.value, 
        quantity: wrapperOfValues.quantity.value, 
        logo: wrapperOfValues.logo.value 
      });
    });
    console.log(collectionNames);
    return collectionNames;
  } catch (error) {
    console.error("Error at retrieval collection names: ", error);
    return [];
  }
};