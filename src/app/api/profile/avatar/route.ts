import { generateAvatar } from "@/app/utils/Avatar";

export async function GET(request: Request) {
  const address = "SP33MY8M7DNN31PDSGG8N9F3BVD1V4FWNE934P4RK";
  const avatarUrl = generateAvatar(address);

  const img = document.createElement("img");
  img.src = avatarUrl || "";
  img.alt = "Avatar";
  img.style.width = "100px";
  img.style.height = "100px";
  document.body.appendChild(img);

  return Response.json(avatarUrl);
}
