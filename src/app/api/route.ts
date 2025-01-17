export const runtime = 'edge';

import { fetchCallReadOnlyFunction, principalCV } from "@stacks/transactions";

export async function GET(): Promise<Response> {
  // const collections: Record<string, string>[] = [];

  const data = await fetchCallReadOnlyFunction({
    contractName: "collection-v4",
    contractAddress: "ST3GBYD0VN28MAPDGNGTFNXQV5QJXQ3VCV3WZT75T",
    functionName: "get-collections-by-owner",
    functionArgs: [principalCV("ST3GBYD0VN28MAPDGNGTFNXQV5QJXQ3VCV3WZT75T")],
    senderAddress: "ST3GBYD0VN28MAPDGNGTFNXQV5QJXQ3VCV3WZT75T",
    network: "testnet",
  });

  return Response.json(
    JSON.parse(
      JSON.stringify(data, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    )
  );
}
