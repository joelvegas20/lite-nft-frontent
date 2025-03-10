export const runtime = 'edge';

/*
 * Local Dependencies
 */
import { ContractName, Contracts, Stacks } from "@/config/config.keys";

/*
 * Third Party Dependencies
 */
import {
  broadcastTransaction,
  fetchCallReadOnlyFunction,
  makeContractCall,
  stringAsciiCV,
  uintCV,
  makeRandomPrivKey
} from "@stacks/transactions";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest): Promise<Response> {
  const collections: Record<string, string>[] = [];

  const pathSegments = request.nextUrl.pathname.split("/");
  const address = pathSegments[pathSegments.length - 1];

  const data = await fetchCallReadOnlyFunction({
    contractName: Contracts[ContractName.COLLECTION].name,
    contractAddress: Contracts[ContractName.COLLECTION].address,
    functionName: "get-collections-by-owner",
    functionArgs: [],
    senderAddress: address, 
    network: Stacks.network,
  });

  if (data.type === "list") {
    data.value.forEach(
      ({
        // @ts-expect-error: El tipo de item.value no coincide con CollectionItem
        value,
      }) => {
        if (value.type === "none") return;

        const item = value;

        collections.push({
          subtitle: item.description.value.toString(),
          id: item.id.value.toString(),
          image: item.logo.value.toString(),
          name: item.name.value.toString(),
        });
      }
    );
  }

  return Response.json({
    status: data.type,
    data: collections,
  });
}
