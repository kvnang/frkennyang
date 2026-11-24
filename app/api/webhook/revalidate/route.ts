import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const tag = searchParams.get("tag") as string | null;
  if (!tag) {
    return new Response("Tag is required", { status: 400 });
  }

  const payload = await req.json();
  // Keep serving cached articles while OpenNext regenerates them in the background.
  const profile = tag === "post" ? "max" : { expire: 0 };

  if (
    payload.slug &&
    payload.slug.current &&
    typeof payload.slug.current === "string"
  ) {
    revalidateTag(`${tag}:${payload.slug.current}`, profile);
    return new Response("OK", { status: 200 });
  }

  revalidateTag(tag, profile);

  return new Response("OK", { status: 200 });
}
