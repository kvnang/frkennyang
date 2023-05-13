const protocol =
  process.env.NEXT_PUBLIC_URL || process.env.NEXT_PUBLIC_VERCEL_URL
    ? "https"
    : "http";
const host =
  process.env.NEXT_PUBLIC_URL ||
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  "localhost:3000";

export const BASE_URL = `${protocol}://${host}`;
