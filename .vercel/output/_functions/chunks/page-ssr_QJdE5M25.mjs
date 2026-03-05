import { createClient } from '@sanity/client';

const sanityClient = createClient(
            {"apiVersion":"2024-03-03","projectId":"YOUR_PROJECT_ID","dataset":"kobe-kataduke","useCdn":true}
          );

globalThis.sanityClient = sanityClient;
