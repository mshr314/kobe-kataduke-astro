// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');

export default defineConfig({
  integrations: [
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID || 'mqj7r953',
      dataset: env.PUBLIC_SANITY_DATASET || 'production',
      useCdn: true,
      apiVersion: '2024-03-03',
      studioBasePath: '/admin',
    }),
    react(),
    sitemap(),
  ],
  output: 'server',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
});
