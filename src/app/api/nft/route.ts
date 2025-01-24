export const runtime = 'edge';

/*
 * Local Dependencies
 */
import { ContractName, Contracts, Stacks } from "@/config/config.keys";

/*
 * Third Party Dependencies
 */
import { fetchCallReadOnlyFunction } from "@stacks/transactions";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
  const collections: Record<string, string>[] = [];

  const pathSegments = request.nextUrl.pathname.split("/");
  const address = pathSegments[pathSegments.length - 1];

  console.log(address);

  const data = (await fetchCallReadOnlyFunction({
    contractName: Contracts[ContractName.COLLECTION].name,
    contractAddress: Contracts[ContractName.COLLECTION].address,
    functionName: "get-nfts-by-owner",
    functionArgs: [],
    senderAddress: Contracts[ContractName.COLLECTION].address,
    network: Stacks.network,
  })) as any;

  if (data.type === "list") {
    data.value.forEach(({ value }) => {
      if (value.type === "none") return;

      const item = value;

      collections.push({
        subtitle: "",
        id: item.id.value.toString(),
        image: item.image.value.toString(),
        name: item.name.value.toString(),
      });
    });
  }

  return Response.json({
    status: data.type,
    data: collections,
  });
}
