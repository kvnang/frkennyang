"use client";

import { LiveQueryProvider } from "@sanity/preview-kit";
import { createClient } from "@sanity/preview-kit/client";
import { apiVersion, dataset, projectId, useCdn } from "@/lib/sanity.api";

const client = createClient({ apiVersion, dataset, projectId, useCdn });

export default function PreviewProvider({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string;
}) {
  if (!token) throw new TypeError("Missing token");

  return (
    <LiveQueryProvider client={client} token={token} logger={console}>
      {children}
    </LiveQueryProvider>
  );
}
