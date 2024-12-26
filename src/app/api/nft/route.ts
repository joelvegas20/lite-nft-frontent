import { fetchCallReadOnlyFunction, principalCV } from "@stacks/transactions";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest): Promise<Response> {

  return Response.json({
    message: "Implement This route: /api/nft | Return all available NFTs",
    status: 200
  });
}
