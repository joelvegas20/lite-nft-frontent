import { fetchCallReadOnlyFunction, makeContractCall,broadcastTransaction, parseReadOnlyResponse, principalCV, uintCV } from "@stacks/transactions";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest): Promise<Response> {
  const collections: Record<string, string>[] = [];

  const pathSegments = request.nextUrl.pathname.split("/");
  const address = pathSegments[pathSegments.length - 2];
  const collectionId = pathSegments[pathSegments.length - 1];

  const data = await makeContractCall({
    contractName: "collection-v4",
    contractAddress: "ST3GBYD0VN28MAPDGNGTFNXQV5QJXQ3VCV3WZT75T",
    functionName: "get-nfts-by-collection",
    functionArgs: [uintCV(3)],
    // senderAddress: address,
    senderKey: "6f453a44b9d48b4d42547e2f1d3b07e71c492728012caa43af5bb0ecc0ed0c84",
    network: "testnet",
  });

  const result = await broadcastTransaction({transaction: data});

  return Response.json(
    JSON.parse(
      JSON.stringify(result, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    )
  );

  // if (data.type === "ok") {

  //   data.value?.value.forEach(({value}) => {

  //     console.log(value)

  //     collections.push({
  //       subtitle: value.description.value.toString(),
  //       id: value.id.value.toString(),
  //       image: value.logo.value.toString(),
  //       name: value.name.value.toString(),
  //     });
  //   });

  //   return Response.json({
  //     status: "ok",
  //     data: collections,
  //   });
  // }

  // return Response.json({
  //   status: "error",
  //   message: "Error Getting Data",
  // });
}
