import { openContractCall } from "@stacks/connect";
import { stringAsciiCV, StringAsciiCV } from "@stacks/transactions";

interface createCollectionProps {
  collectionName: string;
  collectionDescription: string;
  collectionLogo: string;
};

export const createCollection = ({
  collectionName,
  collectionDescription,
  collectionLogo,
}: createCollectionProps) => {
  openContractCall({
    contractAddress: 'ST3GBYD0VN28MAPDGNGTFNXQV5QJXQ3VCV3WZT75T',
    contractName: 'collection-v5',
    functionName: 'create-collection',
    functionArgs: [stringAsciiCV(collectionName), stringAsciiCV(collectionDescription), stringAsciiCV(collectionLogo)],
    network: 'testnet',
    onFinish: (data) => {
      console.log('Data:', data);
    },
    onCancel: () => {
      console.log('User cancelled the transaction');
    },
  });
};