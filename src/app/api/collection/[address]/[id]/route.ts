export const runtime = 'edge';
/*
 * Local Dependencies
 */
import { ContractName, Contracts, Stacks } from "@/config/config.keys";

/*
 * Third Party Dependencies
 */
import {
  ClarityValue,
  cvToValue,
  fetchCallReadOnlyFunction,
} from "@stacks/transactions";
import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";

type Collections = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  logo: string;
}[];

export async function GET(request: NextRequest): Promise<Response> {
  const collections: Collections = [];

  const pathSegments = request.nextUrl.pathname.split("/");
  const address = pathSegments[pathSegments.length - 2];
  const collectionId = pathSegments[pathSegments.length - 1];

  const data = await fetchCallReadOnlyFunction({
    contractName: Contracts[ContractName.COLLECTION].name,
    contractAddress: Contracts[ContractName.COLLECTION].address,
    functionName: "get-all-collections",
    functionArgs: [],
    senderAddress: address,
    network: Stacks.network,
  });
  (cvToValue(data) as Array<ClarityValue>).forEach((value) => {
    const wrapperOfValues: any = (value as any).value;
    collections.push({
      id: wrapperOfValues.id.value,
      name: wrapperOfValues.name.value,
      description: wrapperOfValues.description.value,
      quantity: wrapperOfValues.quantity.value,
      logo: wrapperOfValues.logo.value
    });
  });
  const res = collections.find((collection) => collection.id === collectionId);
  if (res === undefined) {
    return Response.json(
      {
        status: "error",
        message: "Collection not found",
      },
      {
        status: 404,
      },
    );
  }
  return Response.json(
    {
      status: "success",
      res: res,
    },
  );
}


