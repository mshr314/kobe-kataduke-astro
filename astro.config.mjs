// @ts-check
import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [
    sanity({
      projectId: 'mqj7r953',
      dataset: 'production',
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
