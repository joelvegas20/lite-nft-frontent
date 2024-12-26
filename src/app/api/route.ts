import { fetchCallReadOnlyFunction, principalCV } from "@stacks/transactions";

export async function GET(): Promise<Response> {
  const collections: Record<string, string>[] = [];

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
