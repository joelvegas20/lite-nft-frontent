/*
 * Local Dependencies
 */
import { storage } from "./Storage";

/*
 * Third Party Dependencies
 */
import { stringAsciiCV, uintCV } from "@stacks/transactions";
import { openContractCall } from "@stacks/connect";
import csvParser from "csv-parser";
import { Readable } from "stream";
import { useRouter } from "next/router";
import {ContractName, Contracts, Stacks} from "@config/config.keys";

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
  asset_type: string;
  image: string;
}

const generateMedatada = ({
  name,
  collection,
  attributes,
  asset_type,
  image,
}: MetadataProps) => {
  const trait_value: { trait: string; value: string }[] = [];
  Object.entries(attributes).forEach(([key, value]) => {
    trait_value.push({
      trait: key,
      value: value,
    });
  });
  return {
    sip: 16,
    name: name,
    properties: {
      collection: collection,
    },
    attributes: trait_value,
    asset_type: asset_type,
    image: image,
  };
};

const uploadImage = async (NFTName: string, NFTLogo: File) => {
  return await storage.putFile(`${NFTName}-image`, NFTLogo as File, {
    encrypt: false,
  });
};


const uploadMetadata = async (name: string, metadata: string) => {
  return await storage.putFile(`${name}-metadata`, metadata, {
    encrypt: false,
  });
};

export const parseCSV = async (
  csvContent: string
): Promise<ParsedCSVRecord> => {
  return new Promise((resolve, reject) => {
    const results: ParsedCSVRecord[] = [];
    const stream = Readable.from([csvContent]);
    stream
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results[0]);
      })
      .on("error", (error) => reject(error));
  });
};

export const createNFT = async ({
  NFTName,
  NFTAttributes,
  NFTLogo,
  collectionId,
  collectionName
}: NFTCollectionProps) : Promise <void | string> => {
  // const router = useRouter();
  const reader = new FileReader();
  reader.onload = async () => {
    try {
      // retrieving the content of the csv file
      const csvContent = reader.result as string;
      const nftLogoURL = await uploadImage(NFTName, NFTLogo as File);
      // parsing the content into a json object
      const results = await parseCSV(csvContent);
      const metadata = generateMedatada({
        name: NFTName,
        collection: collectionName,
        attributes: results,
        asset_type: "image",
        image: nftLogoURL,
      });
      const nftAttrURL = await uploadMetadata(
        NFTName,
        JSON.stringify(metadata)
      ); 
      await openContractCall({
        contractAddress: Contracts[ContractName.COLLECTION].address,
        contractName:Contracts[ContractName.COLLECTION].name,
        functionName: "create-nft",
        functionArgs: [
          stringAsciiCV(NFTName),
          stringAsciiCV(nftAttrURL),
          stringAsciiCV(nftLogoURL),
          uintCV(collectionId),
        ],
        network: Stacks.network,
        onFinish: (data) => {
          window.location.replace("/profile");
        },
        onCancel: () => {
          window.location.replace("/create-nft");  
          console.log("User cancelled the transaction");
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  reader.readAsText(NFTAttributes as File);
};
