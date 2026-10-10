import { cp, mkdir, rm, writeFile } from "node:fs/promises";

await rm("dist",{recursive:true,force:true});
await mkdir("dist/client",{recursive:true});
await mkdir("dist/server",{recursive:true});
await cp("site","dist/client",{recursive:true});
await writeFile("dist/server/index.js",`export default {\n  async fetch(request, env) {\n    const response = await env.ASSETS.fetch(request);\n    if (response.status !== 404) return response;\n    const url = new URL(request.url);\n    url.pathname = \"/index.html\";\n    return env.ASSETS.fetch(new Request(url, request));\n  }\n};\n`);
await writeFile("dist/server/wrangler.json",JSON.stringify({main:"index.js",compatibility_date:"2026-10-10",assets:{directory:"../client",binding:"ASSETS",not_found_handling:"single-page-application"}},null,2));
console.log("Static site built in dist/");
