import { createClient } from 'next-sanity';
import { projectId, dataset, useCdn, apiVersion } from './sanity.api';

const client = createClient({
  projectId, // you can find this in sanity.json
  dataset, // or the name you chose in step 1
  useCdn, // `false` if you want to ensure fresh data
  apiVersion, // use a UTC date string
});

export default client;
