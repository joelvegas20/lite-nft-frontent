export const runtime = 'nodejs';
/*
 * Local Dependencies
 */
import { ContractName, Contracts, Stacks } from "@/config/config.keys";

/*
 * Third Party Dependencies
 */
import {
  makeContractCall,
  broadcastTransaction,
  uintCV,
} from "@stacks/transactions";
// import { NextRequest } from "next/server";

export async function GET(): Promise<Response> {
  // const collections: Record<string, string>[] = [];

  // const pathSegments = request.nextUrl.pathname.split("/");
  // const address = pathSegments[pathSegments.length - 2];
  // const collectionId = pathSegments[pathSegments.length - 1];

  const data = await makeContractCall({
    contractName: Contracts[ContractName.COLLECTION].name,
    contractAddress: Contracts[ContractName.COLLECTION].address,
    functionName: "get-nfts-by-collection",
    functionArgs: [uintCV(3)],
    // senderAddress: address,
    senderKey:
      "6f453a44b9d48b4d42547e2f1d3b07e71c492728012caa43af5bb0ecc0ed0c84",
    network: Stacks.network,
  });

  const result = await broadcastTransaction({ transaction: data });

  return Response.json(
    JSON.parse(
      JSON.stringify(result, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    )
  );
}
