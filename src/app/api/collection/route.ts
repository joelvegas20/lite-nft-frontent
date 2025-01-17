export const runtime = 'edge';

/*
 * Third Party Dependencies
 */
import { fetchCallReadOnlyFunction } from "@stacks/transactions";

export async function GET(): Promise<Response> {
  const data = await fetchCallReadOnlyFunction({
    contractName: "collection",
    contractAddress: "ST3GBYD0VN28MAPDGNGTFNXQV5QJXQ3VCV3WZT75T",
    functionName: "get-all-collections",
    functionArgs: [],
    senderAddress: "ST3GBYD0VN28MAPDGNGTFNXQV5QJXQ3VCV3WZT75T",
    network: "testnet",
  });

  return Response.json(data);
}

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
