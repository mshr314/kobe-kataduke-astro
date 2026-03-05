import '../chunks/page-ssr_QJdE5M25.mjs';
import { f as createComponent, l as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_B54mHHzv.mjs';
import 'piccolore';
import { a as fetchBlogPosts, $ as $$Layout } from '../chunks/client_Jt_iCkVL.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  let posts = [];
  try {
    posts = await fetchBlogPosts();
  } catch (e) {
  }
  const fallback = [
    { slug: { current: "sanbu-isan-seiri-5sen" }, publishedAt: "2026-03-01", title: "\u4E09\u5BAE\u3067\u304A\u3059\u3059\u3081\u306E\u907A\u54C1\u6574\u7406\u696D\u80055\u9078\u30102026\u5E74\u6700\u65B0\u3011", category: "area-guide", excerpt: "\u4E09\u5BAE\u30A8\u30EA\u30A2\u3067\u5B9F\u7E3E\u306E\u3042\u308B\u907A\u54C1\u6574\u7406\u696D\u8005\u3092\u5FB9\u5E95\u6BD4\u8F03\u3002\u6599\u91D1\u30FB\u5BFE\u5FDC\u30A8\u30EA\u30A2\u30FB\u8CC7\u683C\u30FB\u53E3\u30B3\u30DF\u3092\u5143\u306B\u30E9\u30F3\u30AD\u30F3\u30B0\u5F62\u5F0F\u3067\u3054\u7D39\u4ECB\u3057\u307E\u3059\u3002" },
    { slug: { current: "gomiyashiki-cost-kobe" }, publishedAt: "2026-02-15", title: "\u795E\u6238\u5E02\u306E\u30B4\u30DF\u5C4B\u6577\u6E05\u6383\u306B\u304B\u304B\u308B\u8CBB\u7528\u306E\u76F8\u5834\u3068\u696D\u8005\u9078\u3073\u306E\u30DD\u30A4\u30F3\u30C8", category: "gomiyashiki", excerpt: "\u30B4\u30DF\u5C4B\u6577\u6E05\u6383\u306E\u8CBB\u7528\u76F8\u5834\u306F\u9593\u53D6\u308A\u3084\u8377\u7269\u91CF\u306B\u3088\u3063\u3066\u5927\u304D\u304F\u7570\u306A\u308A\u307E\u3059\u3002\u795E\u6238\u5E02\u5185\u306E\u4E8B\u4F8B\u3092\u5143\u306B\u3001\u9069\u6B63\u4FA1\u683C\u306E\u898B\u6975\u3081\u65B9\u3092\u89E3\u8AAC\u3057\u307E\u3059\u3002" },
    { slug: { current: "isan-seiri-shi-kobe" }, publishedAt: "2026-02-01", title: "\u907A\u54C1\u6574\u7406\u58EB\u3068\u306F\u3069\u3093\u306A\u8CC7\u683C\uFF1F\u795E\u6238\u3067\u4F9D\u983C\u3059\u308B\u30E1\u30EA\u30C3\u30C8\u3092\u89E3\u8AAC", category: "isan-seiri", excerpt: "\u300C\u907A\u54C1\u6574\u7406\u58EB\u300D\u3068\u3044\u3046\u8A8D\u5B9A\u8CC7\u683C\u3092\u3054\u5B58\u77E5\u3067\u3059\u304B\uFF1F\u8CC7\u683C\u306E\u5185\u5BB9\u3001\u53D6\u5F97\u65B9\u6CD5\u3001\u30E1\u30EA\u30C3\u30C8\u3092\u308F\u304B\u308A\u3084\u3059\u304F\u89E3\u8AAC\u3057\u307E\u3059\u3002" }
  ];
  const displayPosts = posts.length > 0 ? posts : fallback;
  const categoryLabels = {
    "isan-seiri": "\u907A\u54C1\u6574\u7406",
    "seizen-seiri": "\u751F\u524D\u6574\u7406",
    "gomiyashiki": "\u30B4\u30DF\u5C4B\u6577\u6E05\u6383",
    "tokusu-seiou": "\u7279\u6B8A\u6E05\u6383",
    "area-guide": "\u5730\u57DF\u30AC\u30A4\u30C9",
    "tips": "\u304A\u5F79\u7ACB\u3061\u60C5\u5831"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "\u304A\u5F79\u7ACB\u3061\u8A18\u4E8B\u4E00\u89A7 | \u795E\u6238\u304A\u7247\u4ED8\u3051\u30B5\u30DD\u30FC\u30C8\u30BB\u30F3\u30BF\u30FC", "description": "\u795E\u6238\u5E02\u306E\u907A\u54C1\u6574\u7406\u30FB\u30B4\u30DF\u5C4B\u6577\u6E05\u6383\u306B\u95A2\u3059\u308B\u304A\u5F79\u7ACB\u3061\u60C5\u5831\u3092\u767A\u4FE1\u3057\u3066\u3044\u307E\u3059\u3002\u8CBB\u7528\u306E\u76EE\u5B89\u3001\u696D\u8005\u9078\u3073\u306E\u30B3\u30C4\u3001\u5730\u57DF\u5225\u30AC\u30A4\u30C9\u306A\u3069\u3002" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<header class="bg-[#081a38] sticky top-0 z-50 shadow-lg"> <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-2"> <a href="/" class="flex flex-col leading-tight"> <span class="text-[#f5c842] font-black text-lg tracking-tight">神戸お片付けサポートセンター</span> <span class="text-blue-200 text-xs mt-0.5">遺品整理・ゴミ屋敷清掃の専門窓口</span> </a> <a href="tel:050XXXXXXXX" class="cta-btn tel-link text-sm px-5 py-2.5"> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5.5a15.5 15.5 0 0015 15l2.5-2.5-3-3-2 2a11 11 0 01-7-7l2-2-3-3L3 5.5z"></path></svg> <span class="font-black">050-XXXX-XXXX</span> </a> </div> </header> <main class="min-h-screen bg-slate-50 py-12 px-5"> <div class="max-w-3xl mx-auto"> <nav class="text-xs text-gray-400 mb-6"> <a href="/" class="hover:text-[#1a4480]">トップ</a> &rsaquo; お役立ち記事
</nav> <p class="text-center text-xs font-bold tracking-widest text-[#1a4480] mb-2 uppercase">お役立ち情報</p> <h1 class="text-2xl md:text-3xl font-black text-center text-[#081a38] mb-10">
遺品整理・ゴミ屋敷清掃の<br><span class="text-[#c98700]">お役立ち記事</span> </h1> <div class="grid grid-cols-1 gap-6"> ${displayPosts.map((post) => renderTemplate`<a${addAttribute(`/blog/${post.slug?.current}`, "href")} class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow block group"> <div class="flex items-start gap-4"> <div class="flex-1"> <div class="flex items-center gap-2 mb-2"> <span class="inline-block bg-[#0f2d5c] text-[#f5c842] text-xs px-3 py-1 rounded-full font-bold">${categoryLabels[post.category] || "\u304A\u5F79\u7ACB\u3061\u60C5\u5831"}</span> <time class="text-gray-400 text-xs">${post.publishedAt?.replace(/-/g, ".")}</time> </div> <h2 class="font-black text-[#081a38] text-base md:text-lg leading-snug mb-2 group-hover:text-[#2d5fa0] transition-colors">${post.title}</h2> <p class="text-gray-500 text-sm leading-relaxed">${post.excerpt}</p> </div> <span class="text-[#2d5fa0] font-bold text-sm flex-shrink-0 mt-1">→</span> </div> </a>`)} </div> <div class="mt-12 bg-[#081a38] text-white rounded-2xl p-6 text-center"> <p class="font-black text-lg mb-2">まずはお気軽にご相談ください</p> <p class="text-blue-200 text-sm mb-4">24時間・年中無休で受付中です</p> <a href="tel:050XXXXXXXX" class="cta-btn tel-link text-lg px-8 py-4 mx-auto"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5.5a15.5 15.5 0 0015 15l2.5-2.5-3-3-2 2a11 11 0 01-7-7l2-2-3-3L3 5.5z"></path></svg>
無料見積りに電話する
</a> </div> </div> </main> ` })}`;
}, "/Users/masahiro/.agent/kobe-kataduke-astro/src/pages/blog/index.astro", void 0);

const $$file = "/Users/masahiro/.agent/kobe-kataduke-astro/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
