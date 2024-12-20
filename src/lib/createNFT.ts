import { openContractCall } from "@stacks/connect";
import { stringAsciiCV, uintCV } from "@stacks/transactions";

interface NFTCollectionProps {
  NFTName: string;
  NFTAttributes: string;
  NFTLogo: string;
  collectionId: number;
};

export const createNFT = ({
  NFTName,
  NFTAttributes,
  NFTLogo,
  collectionId
}: NFTCollectionProps) => {
  openContractCall({
    contractAddress: 'ST3GBYD0VN28MAPDGNGTFNXQV5QJXQ3VCV3WZT75T',
    contractName: 'collection-v5',
    functionName: 'create-nft',
    // name - attributes of the nft[URI] - image[URI] - collection-id
    functionArgs: [stringAsciiCV(NFTName), stringAsciiCV(NFTAttributes), stringAsciiCV(NFTLogo), uintCV(collectionId)],
    network: 'testnet',
    onFinish: (data) => {
      console.log('Data:', data);
    },
    onCancel: () => {
      console.log('User cancelled the transaction');
    },
  });
};