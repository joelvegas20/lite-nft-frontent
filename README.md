# LiteNFT Project - Fronted

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Modules

### Create Collection

To create a collection, we follow a similar approach to creating an NFT. The process involves tracking the collections created via the platform. Refer to the smart contract repository for more details: [LiteNFT Project - Smart Contracts](https://github.com/stacks-training/lite-nft-collection). The key aspect here is the use of [Gaia Storage](https://docs.stacks.co/concepts/gaia) to store the collection metadata.

The workflow is as follows:
1. The function `createCollection` in `@/lib/createCollection.ts` receives the collection name, description, and image from the metadata
2. So first the image is uploaded to [gaia](https://docs.stacks.co/concepts/gaia)
    ```js
    const uploadImage = async (
    collectionName: string,
    collectionImage: File,
    ) => {
    // this return the url of the upload image into the gaia storage
    return await storage.putFile(
        `${collectionName}-image`,
        collectionImage as File,
        {
        encrypt: false,
        });
    };
    ```
3. Then the collection is registered in the smart contract, through the ublic function `create-collection`
    ```js
    export const createCollection = async ({
    collectionName,
    collectionDescription,
    collectionImage,
    }: createCollectionProps) => {
    const imageURL = await uploadImage(collectionName, collectionImage as File);
    await openContractCall({
        contractAddress: 'ST3GBYD0VN28MAPDGNGTFNXQV5QJXQ3VCV3WZT75T',
        contractName: 'collection-v5',
        functionName: 'create-collection',
        functionArgs: [stringAsciiCV(collectionName), stringAsciiCV(collectionDescription), stringAsciiCV(imageURL)],
        network: 'testnet',
        onFinish: (data) => {
        console.log('Data:', data);
        },
        onCancel: () => {
        console.log('User cancelled the transaction');
        },
    });
    };
    ```

This ensures that the collection is properly created and stored, making it accessible for future reference and use.
    
### Create NFT

To create a NFT, in the sense of building a gallery we adopted a approach of keeping track of whatever we create via the platform. Checkout the smart contract repository to see how this works [LiteNFT Project - Smart Contracts](https://github.com/stacks-training/lite-nft-collection). The crux here is usage of [Gaia Storage](https://docs.stacks.co/concepts/gaia) to save the image and the nft that behalf the new NFT. 
To get this done we've the following workflow:
1. The function `createNFT` at `@/lib/createNFT.ts` recieves from the fronted the metadata, the image, NFT's name and the collection it belongs to. 

2. So first the image is uploaded to [gaia](https://docs.stacks.co/concepts/gaia) in order to correctly fill up the [SIP016](https://github.com/stacksgov/sips/blob/main/sips/sip-016/sip-016-token-metadata.md) format
    ```js
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
    ```     
3. Then the metada, which is a csv (that follows the [format](https://support.gamma.io/hc/en-us/articles/6011142909971-What-is-the-correct-format-for-Stacks-NFT-metadata-CSV-files) that gamma accepts) is loaded and parsed using [csv-parser](https://www.npmjs.com/package/csv-parser) package
    >Is important to note that the csv must have a header with the value's names and a single row for the actual values. The rest of the rows will not be considered
    ```js
    // Function to parse the incoming csv file with the metadata
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
    ```
    Then we exert the function genertate metatadata, correctly generating a json metada file, that is uploaded to [gaia](https://docs.stacks.co/concepts/gaia)
    ```js
    const generateMedatada = ({
    name,
    collection,
    attributes,
    asset_type,
    image
    }: MetadataProps) => {
    let trait_value: { trait: string; value: string }[] = [];
    // generate the trait-value pairs
    Object.entries(attributes).forEach(([key, value]) => {
        trait_value.push({
        "trait": key,
        "value": value
        });
    });
    // return the actual json metadata object
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
    ```

4. Finally the NFT is registered in the smart contract, using the `create-nft` function.
    ```js
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
    ```

This ensures that the NFT is properly created and stored, making it accessible for future reference and use.
