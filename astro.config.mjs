// @ts-check
import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // canonical URL と @astrojs/sitemap の生成に必要
  site: 'https://kobe-kataduke-support.jp',
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
  security: {
    // Astro標準のCSRF保護は Origin を site（kobe-kataduke-support.jp）と
    // 照合するため、独自ドメイン接続前の *.vercel.app からの送信が
    // すべて拒否されてしまう。
    // 参照元の検証は /api/estimate 側で許可ホストを明示して行っているため、
    // ここでは無効化する（独自ドメイン接続後も API 側の検証は有効なまま）。
    checkOrigin: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
