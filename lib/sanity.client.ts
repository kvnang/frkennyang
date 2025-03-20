import { createClient } from "next-sanity";
import { projectId, dataset, useCdn, apiVersion } from "./sanity.api";
import { cache } from "react";

export const client = createClient({
  projectId, // you can find this in sanity.json
  dataset, // or the name you chose in step 1
  useCdn, // `false` if you want to ensure fresh data
  apiVersion, // use a UTC date string
});

// Wrap the cache function in a way that reuses the TypeScript definitions
export const clientFetch = cache(client.fetch.bind(client));

export const getClient = ({ token }: { token: string }) => {
  return createClient({
    projectId, // you can find this in sanity.json
    dataset, // or the name you chose in step 1
    useCdn, // `false` if you want to ensure fresh data
    apiVersion, // use a UTC date string
    token,
  });
};
