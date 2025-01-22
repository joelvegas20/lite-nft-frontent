export const runtime = 'nodejs';

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

  const data = await fetchCallReadOnlyFunction({
    contractName: "collection-v5",
    contractAddress: "ST3GBYD0VN28MAPDGNGTFNXQV5QJXQ3VCV3WZT75T",
    functionName: "get-nfts-by-owner",
    functionArgs: [],
    senderAddress: address,
    network: "testnet",
  }) as any;

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
