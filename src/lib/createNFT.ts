import { openContractCall } from "@stacks/connect";
import { fetchCallReadOnlyFunction, stringAsciiCV, uintCV } from "@stacks/transactions";
import { storage } from "./Storage";
import csvParser from "csv-parser";
import { Readable } from "stream";
import { userSession } from "./Wallet";

interface NFTCollectionProps {
  NFTName: string;
  NFTAttributes: File | null;
  NFTLogo: File | null;
  collectionId: number;
  collectionName: string;
};

interface ParsedCSVRecord {
  [key: string]: string;
}

interface MetadataProps {
  name: string;
  collection: string;
  attributes: ParsedCSVRecord;
  asset_type: string; // this will an image for sure
  image: string;
}

const generateMedatada = ({
  name,
  collection,
  attributes,
  asset_type,
  image
}: MetadataProps) => {
  let trait_value: { trait: string; value: string }[] = [];
  Object.entries(attributes).forEach(([key, value]) => {
    trait_value.push({
      "trait": key,
      "value": value
    });
  });
  return {
    "sip": 16,
    "name": name,
    "properties": {
      "collection": collection
    },
    "attributes": trait_value,
    "asset_type": asset_type,
    "image": image
  }
};

const uploadImage = async (
  NFTName: string,
  NFTLogo: File,
) => {
  // this return the url of the upload image into the gaia storage
  return await storage.putFile(
    `${NFTName}-image`,
    NFTLogo as File,
    {
      encrypt: false,
    }
  );
};

const uploadMetadata = async (
  name: string,
  metadata: string
) => {
  // this return the url of the upload image into the gaia storage
  return await storage.putFile(
    `${name}-metadata`,
    metadata,
    {
      encrypt: false,
    }
  );
};

export const parseCSV = async (csvContent: string): Promise<ParsedCSVRecord> => {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    const stream = Readable.from([csvContent]);
    stream
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results[0]);
      })
      .on('error', (error) => reject(error));
  });
};


export const createNFT = async ({
  NFTName,
  NFTAttributes,
  NFTLogo,
  collectionId,
  collectionName
}: NFTCollectionProps) => {
  const reader = new FileReader();
  reader.onload = async () => {
    try {
      // retrieving the content of the csv file
      const csvContent = reader.result as string;
      const nftLogoURL = await uploadImage(NFTName, NFTLogo as File);
      // parsing the content into a json object
      const results = await parseCSV(csvContent);
      // const collectionName = getCollectionName(collectionId);
      const metadata = generateMedatada({
        name: NFTName,
        collection: collectionName,
        attributes: results,
        asset_type: 'image',
        image: nftLogoURL
      });
      const nftAttrURL = await uploadMetadata(NFTName, JSON.stringify(metadata)); // here will go the url of the uploaded metadata
      openContractCall({
        contractAddress: 'ST3GBYD0VN28MAPDGNGTFNXQV5QJXQ3VCV3WZT75T',
        contractName: 'collection-v5',
        functionName: 'create-nft',
        // name - attributes of the nft[URI] - image[URI] - collection-id
        functionArgs: [stringAsciiCV(NFTName), stringAsciiCV(nftAttrURL), stringAsciiCV(nftLogoURL), uintCV(collectionId)],
        network: 'testnet',
        onFinish: (data) => {
          console.log('Data:', data);
        },
        onCancel: () => {
          console.log('User cancelled the transaction');
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  reader.readAsText(NFTAttributes as File);
};