import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(_: NextRequest) {
  // https://www.fatherkenny.com/api/webhook/cv
  revalidateTag("cv");
  return new Response("OK", { status: 200 });
}
