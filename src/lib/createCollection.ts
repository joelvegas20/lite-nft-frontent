import { openContractCall } from "@stacks/connect";
import { stringAsciiCV } from "@stacks/transactions";
import { storage } from "@/lib/Storage"
import { useRouter } from "next/router";

interface createCollectionProps {
  collectionName: string;
  collectionDescription: string;
  collectionImage: File | null;
};

const uploadImage = async (
  collectionName: string,
  collectionImage: File,
) => {
  return await storage.putFile(
    `${collectionName}-image`,
    collectionImage as File,
    {
      encrypt: false,
    });
};

export const createCollection = async ({
  collectionName,
  collectionDescription,
  collectionImage,
}: createCollectionProps) => {
  const router = useRouter();
  const imageURL = await uploadImage(collectionName, collectionImage as File);
  await openContractCall({
    contractAddress: 'ST3GBYD0VN28MAPDGNGTFNXQV5QJXQ3VCV3WZT75T',
    contractName: 'collection-v5',
    functionName: 'create-collection',
    functionArgs: [stringAsciiCV(collectionName), stringAsciiCV(collectionDescription), stringAsciiCV(imageURL)],
    network: 'testnet',
    onFinish: (data) => {
      console.log('Data:', data);
      router.replace('/profile');
    },
    onCancel: () => {
      router.replace('/create-collection');
    },
  });
};