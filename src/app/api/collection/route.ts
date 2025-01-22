export const runtime = "nodejs";

import {
  ContractAddress,
  ContractName,
  Contracts,
  Stacks,
} from "@/config/config.keys";
/*
 * Third Party Dependencies
 */
import { fetchCallReadOnlyFunction, principalCV } from "@stacks/transactions";
import { NextResponse } from "next/server";

export async function GET(): Promise<Response> {
  const collections: Record<string, string>[] = [];

  const data = await fetchCallReadOnlyFunction({
    contractName: Contracts[ContractName.COLLECTION].name,
    contractAddress: Contracts[ContractName.COLLECTION].address,
    functionName: "get-all-collections",
    functionArgs: [],
    senderAddress: "ST2SJ42BZ81YT3FA4V7PE4F0DGV4V60XWWK58VXC7",
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



// return Response.json({
//   status: "error",
//   message: "Error Getting Data",
// });
