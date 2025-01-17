export const runtime = 'edge';



export async function GET(): Promise<Response> {

  return Response.json({
    message: "Implement This route: /api/nft | Return all available NFTs",
    status: 200
  });
}
