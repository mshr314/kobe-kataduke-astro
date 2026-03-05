import { e as createAstro, f as createComponent, h as addAttribute, r as renderTemplate, u as unescapeHTML, k as renderHead, o as renderSlot } from './astro/server_B54mHHzv.mjs';
import 'piccolore';
import 'clsx';
/* empty css                          */
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://kobe-kataduke-support.jp");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "\u795E\u6238\u5E02\u306E\u907A\u54C1\u6574\u7406\u30FB\u30B4\u30DF\u5C4B\u6577\u6E05\u6383\u306A\u3089\u3010\u795E\u6238\u304A\u7247\u4ED8\u3051\u30B5\u30DD\u30FC\u30C8\u30BB\u30F3\u30BF\u30FC\u3011\u5373\u65E5\u5BFE\u5FDC\u30FB\u7121\u6599\u898B\u7A4D\u308A",
    description = "\u795E\u6238\u5E02\u51689\u533A\u5BFE\u5FDC\u3002\u907A\u54C1\u6574\u7406\u30FB\u751F\u524D\u6574\u7406\u30FB\u30B4\u30DF\u5C4B\u6577\u6E05\u6383\u306F\u795E\u6238\u304A\u7247\u4ED8\u3051\u30B5\u30DD\u30FC\u30C8\u30BB\u30F3\u30BF\u30FC\u3078\u3002\u907A\u54C1\u6574\u7406\u58EB\u5728\u7C4D\u3001\u6700\u77ED\u5373\u65E5\u5BFE\u5FDC\u3001\u304A\u898B\u7A4D\u308A\u5F8C\u306E\u8FFD\u52A0\u8CBB\u7528\u4E00\u5207\u306A\u3057\u3002",
    canonical = Astro2.url.href,
    ogImage = "/og-image.jpg",
    schema = []
  } = Astro2.props;
  return renderTemplate`<html lang="ja"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(canonical, "href")}><!-- OGP --><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type" content="website"><meta property="og:url"${addAttribute(canonical, "content")}><meta property="og:locale" content="ja_JP"><meta property="og:image"${addAttribute(new URL(ogImage, Astro2.site).href, "content")}><meta name="twitter:card" content="summary_large_image"><!-- Google Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet"><!-- Schema.org JSON-LD -->${schema.map((s) => renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(s))))}${renderHead()}</head> <body class="font-sans bg-white text-gray-800 antialiased pb-24"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/masahiro/.agent/kobe-kataduke-astro/src/layouts/Layout.astro", void 0);

const projectId = "YOUR_PROJECT_ID";
const dataset = "kobe-kataduke";
const sanityClient = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: "2024-03-03"
});
imageUrlBuilder(sanityClient);
async function fetchBlogPosts() {
  return sanityClient.fetch(`
    *[_type == "blogPost"] | order(publishedAt desc) {
      title,
      slug,
      publishedAt,
      category,
      excerpt,
      eyecatch,
    }
  `);
}
async function fetchBlogPost(slug) {
  return sanityClient.fetch(`
    *[_type == "blogPost" && slug.current == $slug][0] {
      title,
      slug,
      publishedAt,
      category,
      excerpt,
      eyecatch,
      body,
      seoTitle,
      seoDescription,
    }
  `, { slug });
}
async function fetchTestimonials() {
  return sanityClient.fetch(`
    *[_type == "testimonial"] | order(publishedAt desc) {
      name,
      profile,
      area,
      serviceType,
      rating,
      content,
    }
  `);
}

export { $$Layout as $, fetchBlogPosts as a, fetchTestimonials as b, fetchBlogPost as f };
