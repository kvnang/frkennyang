import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const tag = searchParams.get("tag") as string | null;
  if (!tag) {
    return new Response("Tag is required", { status: 400 });
  }

  const payload = await req.json();

  console.log(payload);

  revalidateTag(tag);
  return new Response("OK", { status: 200 });
}
