import '../../chunks/page-ssr_C2-ti48D.mjs';
import { e as createAstro, f as createComponent, l as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, n as Fragment, u as unescapeHTML } from '../../chunks/astro/server_CBEuluO7.mjs';
import 'piccolore';
import { f as fetchBlogPost, $ as $$Layout } from '../../chunks/client_Cq0__IeH.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://kobe-kataduke-support.jp");
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  function ptToHtml(blocks) {
    if (!blocks) return "";
    return blocks.map((block) => {
      if (block._type === "block") {
        const text = (block.children || []).map((c) => c.text || "").join("");
        const style = block.style || "normal";
        if (style === "h2") return `<h2 class="text-xl font-black text-navy-800 mt-8 mb-3">${text}</h2>`;
        if (style === "h3") return `<h3 class="text-lg font-bold text-navy-700 mt-6 mb-2">${text}</h3>`;
        if (style === "blockquote") return `<blockquote class="border-l-4 border-navy-300 pl-4 text-gray-500 italic my-4">${text}</blockquote>`;
        return `<p class="mb-4 leading-relaxed">${text}</p>`;
      }
      if (block._type === "image" && block.asset) {
        return `<img src="${block.asset.url || ""}" alt="${block.alt || ""}" class="rounded-xl my-6 w-full"/>`;
      }
      return "";
    }).join("");
  }
  const { slug } = Astro2.params;
  let post = null;
  try {
    if (slug) post = await fetchBlogPost(slug);
  } catch (e) {
  }
  if (!post) {
    return Astro2.redirect("/blog");
  }
  const categoryLabels = {
    "isan-seiri": "\u907A\u54C1\u6574\u7406",
    "seizen-seiri": "\u751F\u524D\u6574\u7406",
    "gomiyashiki": "\u30B4\u30DF\u5C4B\u6577\u6E05\u6383",
    "tokusu-seiou": "\u7279\u6B8A\u6E05\u6383",
    "area-guide": "\u5730\u57DF\u30AC\u30A4\u30C9",
    "tips": "\u304A\u5F79\u7ACB\u3061\u60C5\u5831"
  };
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.seoTitle || post.title,
    "description": post.seoDescription || post.excerpt || "",
    "datePublished": post.publishedAt,
    "author": {
      "@type": "Organization",
      "name": "\u795E\u6238\u304A\u7247\u4ED8\u3051\u30B5\u30DD\u30FC\u30C8\u30BB\u30F3\u30BF\u30FC"
    },
    "publisher": {
      "@type": "Organization",
      "name": "\u795E\u6238\u304A\u7247\u4ED8\u3051\u30B5\u30DD\u30FC\u30C8\u30BB\u30F3\u30BF\u30FC"
    }
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${post.seoTitle || post.title} | \u795E\u6238\u304A\u7247\u4ED8\u3051\u30B5\u30DD\u30FC\u30C8\u30BB\u30F3\u30BF\u30FC`, "description": post.seoDescription || post.excerpt || "", "schema": [articleSchema] }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<header class="bg-[#081a38] sticky top-0 z-50 shadow-lg"> <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-2"> <a href="/" class="flex flex-col leading-tight"> <span class="text-[#f5c842] font-black text-lg tracking-tight">神戸お片付けサポートセンター</span> <span class="text-blue-200 text-xs mt-0.5">遺品整理・ゴミ屋敷清掃の専門窓口</span> </a> <a href="tel:050XXXXXXXX" class="cta-btn tel-link text-sm px-5 py-2.5"> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5.5a15.5 15.5 0 0015 15l2.5-2.5-3-3-2 2a11 11 0 01-7-7l2-2-3-3L3 5.5z"></path></svg> <span class="font-black">050-XXXX-XXXX</span> </a> </div> </header> <main class="min-h-screen bg-white py-12 px-5"> <div class="max-w-2xl mx-auto"> <nav class="text-xs text-gray-400 mb-6"> <a href="/" class="hover:text-[#1a4480]">トップ</a> &rsaquo;
<a href="/blog" class="hover:text-[#1a4480]">お役立ち記事</a> &rsaquo;
<span class="text-gray-600">${post.title}</span> </nav> <article itemscope itemtype="https://schema.org/BlogPosting"> <div class="mb-4 flex items-center gap-2"> <span class="inline-block bg-[#0f2d5c] text-[#f5c842] text-xs px-3 py-1 rounded-full font-bold"> ${categoryLabels[post.category] || "\u304A\u5F79\u7ACB\u3061\u60C5\u5831"} </span> <time class="text-gray-400 text-xs" itemprop="datePublished"${addAttribute(post.publishedAt, "datetime")}> ${post.publishedAt?.replace(/-/g, ".")} </time> </div> <h1 class="text-xl md:text-3xl font-black text-[#081a38] leading-snug mb-6" itemprop="headline"> ${post.title} </h1> ${post.excerpt && renderTemplate`<p class="bg-[#f0f4fa] border-l-4 border-[#1a4480] px-4 py-3 text-gray-600 text-sm leading-relaxed mb-8 rounded-r-xl"> ${post.excerpt} </p>`} <div class="prose prose-sm md:prose-base max-w-none text-gray-700 leading-relaxed" itemprop="articleBody"> ${post.body ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`${unescapeHTML(ptToHtml(post.body))}` })}` : renderTemplate`<p class="text-gray-400 text-center py-12">記事のコンテンツを読み込み中...</p>`} </div> </article> <div class="mt-12 section-divider"></div> <div class="mt-10 bg-[#081a38] text-white rounded-2xl p-6 text-center"> <p class="font-black text-lg mb-2">神戸市のお片付けは<span class="text-[#f5c842]">お気軽にご相談</span>ください</p> <p class="text-blue-200 text-sm mb-4">24時間・年中無休｜無料見積り・追加費用なし</p> <a href="tel:050XXXXXXXX" class="cta-btn tel-link text-lg px-8 py-4 mx-auto"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5.5a15.5 15.5 0 0015 15l2.5-2.5-3-3-2 2a11 11 0 01-7-7l2-2-3-3L3 5.5z"></path></svg>
無料見積りに電話する
</a> </div> <div class="mt-8 text-center"> <a href="/blog" class="text-[#2d5fa0] font-bold text-sm hover:underline">← 記事一覧に戻る</a> </div> </div> </main> ` })}`;
}, "/Users/masahiro/.agent/kobe-kataduke-astro/src/pages/blog/[slug].astro", void 0);

const $$file = "/Users/masahiro/.agent/kobe-kataduke-astro/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
