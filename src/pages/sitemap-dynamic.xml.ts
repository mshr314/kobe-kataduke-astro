import type { APIRoute } from 'astro'
import { WARDS } from '../data/wards'
import { fetchBlogPosts } from '../sanity/client'

/**
 * 動的ページ（区ページ・Sanityのブログ）用サイトマップ。
 *
 * このサイトは output: 'server'（SSR）のため、@astrojs/sitemap は
 * ビルド時に存在する静的ページしか列挙できず、/area/[slug] や
 * /blog/[slug] がサイトマップに載らない。そこでここで生成する。
 */

export const prerender = false

const SITE = 'https://kobe-kataduke-support.jp'

const esc = (s: string) =>
  s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c] as string))

export const GET: APIRoute = async () => {
  // fetchBlogPosts は内部で失敗時に空配列を返す
  const posts: { slug?: { current?: string }; publishedAt?: string }[] =
    (await fetchBlogPosts()) ?? []

  const urls = [
    { loc: `${SITE}/`, pri: '1.0' },
    { loc: `${SITE}/area`, pri: '0.9' },
    { loc: `${SITE}/blog`, pri: '0.7' },
    { loc: `${SITE}/operator`, pri: '0.3' },
    { loc: `${SITE}/privacy`, pri: '0.3' },
    ...WARDS.map((w) => ({ loc: `${SITE}/area/${w.slug}`, pri: '0.9' })),
    ...posts
      .filter((p) => p.slug?.current)
      .map((p) => ({
        loc: `${SITE}/blog/${p.slug!.current}`,
        pri: '0.6',
        mod: p.publishedAt ? new Date(p.publishedAt).toISOString().slice(0, 10) : undefined,
      })),
  ]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u: any) =>
      `  <url>\n    <loc>${esc(u.loc)}</loc>${u.mod ? `\n    <lastmod>${u.mod}</lastmod>` : ''}\n    <changefreq>monthly</changefreq>\n    <priority>${u.pri}</priority>\n  </url>`
  )
  .join('\n')}
</urlset>`

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
