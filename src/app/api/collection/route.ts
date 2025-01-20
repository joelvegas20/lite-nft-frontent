export const runtime = 'nodejs';

import { ContractAddress, ContractName, Contracts, Stacks } from "@/config/config.keys";
/*
 * Third Party Dependencies
 */
import { fetchCallReadOnlyFunction, principalCV } from "@stacks/transactions";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {

  console.log("ContractName.COLLECTION", Contracts[ContractName.COLLECTION].name)
  console.log("ContractAddress.COLLECTION", Contracts[ContractName.COLLECTION].address)

    const data = await fetchCallReadOnlyFunction({
      contractName: Contracts[ContractName.COLLECTION].name,
      contractAddress: Contracts[ContractName.COLLECTION].address,
      functionName: "get-collections-mock",
      // functionName: "get-all-collections",
      functionArgs: [principalCV("ST2SJ42BZ81YT3FA4V7PE4F0DGV4V60XWWK58VXC7")],
      senderAddress: "ST2SJ42BZ81YT3FA4V7PE4F0DGV4V60XWWK58VXC7",
      network: Stacks.network,
    });
  
    return NextResponse.json(
      JSON.parse(
        JSON.stringify(data, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        )
      )
    );
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
