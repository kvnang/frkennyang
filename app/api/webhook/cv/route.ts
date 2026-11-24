import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(_: NextRequest) {
  // https://www.fatherkenny.com/api/webhook/cv
  revalidateTag("cv", { expire: 0 });
  return new Response("OK", { status: 200 });
}
