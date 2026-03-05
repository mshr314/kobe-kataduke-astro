import 'piccolore';
import { p as decodeKey } from './chunks/astro/server_B54mHHzv.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_W_qWVJqE.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/masahiro/.agent/kobe-kataduke-astro/","cacheDir":"file:///Users/masahiro/.agent/kobe-kataduke-astro/node_modules/.astro/","outDir":"file:///Users/masahiro/.agent/kobe-kataduke-astro/dist/","srcDir":"file:///Users/masahiro/.agent/kobe-kataduke-astro/src/","publicDir":"file:///Users/masahiro/.agent/kobe-kataduke-astro/public/","buildClientDir":"file:///Users/masahiro/.agent/kobe-kataduke-astro/dist/client/","buildServerDir":"file:///Users/masahiro/.agent/kobe-kataduke-astro/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{margin:0;padding:0}\n"}],"routeData":{"type":"page","isIndex":false,"route":"/admin/[...params]","pattern":"^\\/admin(?:\\/(.*?))?\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@sanity/astro/dist/studio/studio-route.astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.UGllil0t.css"}],"routeData":{"route":"/blog/[slug]","isIndex":false,"type":"page","pattern":"^\\/blog\\/([^/]+?)\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/blog/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.UGllil0t.css"}],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.UGllil0t.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://kobe-kataduke-support.jp","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/masahiro/.agent/kobe-kataduke-astro/node_modules/@sanity/astro/dist/studio/studio-route.astro",{"propagation":"none","containsHead":true}],["/Users/masahiro/.agent/kobe-kataduke-astro/src/pages/blog/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/masahiro/.agent/kobe-kataduke-astro/src/pages/blog/index.astro",{"propagation":"none","containsHead":true}],["/Users/masahiro/.agent/kobe-kataduke-astro/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/@sanity/astro/dist/studio/studio-route@_@astro":"pages/admin/_---params_.astro.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"pages/blog/_slug_.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_00ncdhER.mjs","/Users/masahiro/.agent/kobe-kataduke-astro/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_C30oRKex.mjs","@astrojs/react/client.js":"_astro/client.eUMmiz80.js","/Users/masahiro/.agent/kobe-kataduke-astro/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.BG8_GHVm.js","/Users/masahiro/.agent/kobe-kataduke-astro/node_modules/sanity/lib/_chunks-es/resources2.js":"_astro/resources2.CuA-AQMO.js","/Users/masahiro/.agent/kobe-kataduke-astro/node_modules/sanity/lib/_chunks-es/resources7.js":"_astro/resources7.BHmPcXiL.js","/Users/masahiro/.agent/kobe-kataduke-astro/node_modules/sanity/lib/_chunks-es/resources6.js":"_astro/resources6.DDZC_L-V.js","/Users/masahiro/.agent/kobe-kataduke-astro/node_modules/sanity/lib/_chunks-es/VideoPlayer.js":"_astro/VideoPlayer.DNVTzQPL.js","/Users/masahiro/.agent/kobe-kataduke-astro/node_modules/sanity/lib/_chunks-es/resources4.js":"_astro/resources4.Odg_7tQk.js","/Users/masahiro/.agent/kobe-kataduke-astro/node_modules/sanity/lib/_chunks-es/resources.js":"_astro/resources.yT4JDP2E.js","/Users/masahiro/.agent/kobe-kataduke-astro/node_modules/sanity/lib/_chunks-es/resources5.js":"_astro/resources5.Cy6uiXgH.js","/Users/masahiro/.agent/kobe-kataduke-astro/node_modules/sanity/lib/_chunks-es/resources3.js":"_astro/resources3.B3q7dtsh.js","/Users/masahiro/.agent/kobe-kataduke-astro/node_modules/sanity/lib/_chunks-es/ViteDevServerStopped.js":"_astro/ViteDevServerStopped.CdgBIbAZ.js","/Users/masahiro/.agent/kobe-kataduke-astro/node_modules/refractor/lang/bash.js":"_astro/bash.CG6S6Dwl.js","/Users/masahiro/.agent/kobe-kataduke-astro/node_modules/refractor/lang/json.js":"_astro/json.unC8z3UW.js","/Users/masahiro/.agent/kobe-kataduke-astro/node_modules/refractor/lang/jsx.js":"_astro/jsx.B6rkBCHQ.js","/Users/masahiro/.agent/kobe-kataduke-astro/node_modules/refractor/lang/typescript.js":"_astro/typescript.TImZN0qJ.js","/Users/masahiro/.agent/kobe-kataduke-astro/node_modules/refractor/lang/javascript.js":"_astro/javascript.BJ-GTedN.js","/Users/masahiro/.agent/kobe-kataduke-astro/node_modules/@sanity/client/dist/_chunks-es/stegaEncodeSourceMap.js":"_astro/stegaEncodeSourceMap.Q7NmS42x.js","/Users/masahiro/.agent/kobe-kataduke-astro/node_modules/@sanity/ui/dist/_chunks-es/refractor.mjs":"_astro/refractor.B_gfJY38.js","/Users/masahiro/.agent/kobe-kataduke-astro/node_modules/react-refractor/dist/index.js":"_astro/index.B4GAntpc.js","/Users/masahiro/.agent/kobe-kataduke-astro/node_modules/sanity/lib/_chunks-es/index2.js":"_astro/index2.BD-J7qII.js","/Users/masahiro/.agent/kobe-kataduke-astro/node_modules/sanity/lib/_chunks-es/index3.js":"_astro/index3.D4GT7EUp.js","/Users/masahiro/.agent/kobe-kataduke-astro/node_modules/sanity/lib/_chunks-es/index4.js":"_astro/index4.CyzutRGn.js","/Users/masahiro/.agent/kobe-kataduke-astro/node_modules/sanity/lib/_chunks-es/resources8.js":"_astro/resources8.BBylyuqY.js","/Users/masahiro/.agent/kobe-kataduke-astro/node_modules/@sanity/astro/dist/studio/studio-component":"_astro/studio-component.DYVAmZL2.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/masahiro/.agent/kobe-kataduke-astro/src/pages/index.astro?astro&type=script&index=0&lang.ts","(function(){const n=document.getElementById(\"estimateForm\"),o=document.getElementById(\"formSuccess\"),t=document.getElementById(\"formError\"),s=document.getElementById(\"submitBtn\");!n||!o||!t||!s||n.addEventListener(\"submit\",function(m){m.preventDefault(),t.classList.add(\"hidden\");const d=document.getElementById(\"name\").value.trim(),r=document.getElementById(\"phone\").value.trim(),i=document.getElementById(\"roomType\").value,e=[];if(d||e.push(\"お名前をご入力ください。\"),r||e.push(\"お電話番号をご入力ください。\"),i||e.push(\"間取りを選択してください。\"),e.length>0){t.innerHTML=e.join(\"<br/>\"),t.classList.remove(\"hidden\");return}s.disabled=!0,s.textContent=\"送信中...\",setTimeout(function(){n.classList.add(\"hidden\"),o.classList.remove(\"hidden\")},1200)})})();"]],"assets":["/_astro/_slug_.UGllil0t.css","/favicon.ico","/favicon.svg","/_astro/VideoPlayer.DNVTzQPL.js","/_astro/ViteDevServerStopped.CdgBIbAZ.js","/_astro/bash.CG6S6Dwl.js","/_astro/browser.BVsflrni.js","/_astro/browser.De2YF0rA.js","/_astro/client.Dq0OWfUj.js","/_astro/client.eUMmiz80.js","/_astro/index.B4GAntpc.js","/_astro/index2.BD-J7qII.js","/_astro/index3.D4GT7EUp.js","/_astro/index4.CyzutRGn.js","/_astro/javascript.BJ-GTedN.js","/_astro/json.unC8z3UW.js","/_astro/jsx.B6rkBCHQ.js","/_astro/refractor.B_gfJY38.js","/_astro/resources.yT4JDP2E.js","/_astro/resources2.CuA-AQMO.js","/_astro/resources3.B3q7dtsh.js","/_astro/resources4.Odg_7tQk.js","/_astro/resources5.Cy6uiXgH.js","/_astro/resources6.DDZC_L-V.js","/_astro/resources7.BHmPcXiL.js","/_astro/resources8.BBylyuqY.js","/_astro/stegaEncodeSourceMap.Q7NmS42x.js","/_astro/studio-component.ChBLb0J5.js","/_astro/studio-component.DYVAmZL2.js","/_astro/typescript.TImZN0qJ.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"INsgbZNEm3p3dN182IaINnq/wjNrmSJBoBuebPxwgCA="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
