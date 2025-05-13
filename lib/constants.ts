const protocol =
  process.env.NEXT_PUBLIC_URL || process.env.NEXT_PUBLIC_VERCEL_URL
    ? "https"
    : "http";
const host =
  process.env.NEXT_PUBLIC_URL ||
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  "localhost:3000";

export const BASE_URL = `${protocol}://${host}`;

export const ORCID_ID = `0000-0001-6563-8863`;
export const CV_UPDATED_AT = `2025-03-15`;
