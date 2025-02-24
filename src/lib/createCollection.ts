import { openContractCall } from "@stacks/connect";
import {stringAsciiCV, stringUtf8CV} from "@stacks/transactions";
import { storage } from "@/lib/Storage"
import { useRouter } from "next/router";
import {ContractName, Contracts, Stacks} from "@config/config.keys";

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
  // const router = useRouter();
  const imageURL = await uploadImage(collectionName, collectionImage as File);
  await openContractCall({
    contractAddress: Contracts[ContractName.COLLECTION].address,
    contractName: Contracts[ContractName.COLLECTION].name,
    functionName: 'create-collection',
    functionArgs: [
        stringUtf8CV(collectionName), stringUtf8CV(collectionDescription), stringUtf8CV(imageURL)],
    network: Stacks.network,
    onFinish: (data) => {
      console.log('Data:', data);
      window.location.replace('/profile');
    },
    onCancel: () => {
      window.location.replace('/create-collection');
    },
  });
};