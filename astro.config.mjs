// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');

export default defineConfig({
  site: 'https://kobe-kataduke-support.jp',
  adapter: vercel(),
  integrations: [
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID || 'YOUR_PROJECT_ID',
      dataset: env.PUBLIC_SANITY_DATASET || 'kobe-kataduke',
      useCdn: true,
      apiVersion: '2024-03-03',
      studioBasePath: '/admin',
    }),
    react(),
    sitemap(),
  ],
  output: 'server',
  vite: {
    plugins: [tailwindcss()],
  },
});
