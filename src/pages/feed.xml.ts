import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { slugFromFilename, dateFromFilename, postUrl, excerptFromBody, plainTitle } from "../utils/slug";

function escapeXml(s: string): string {
  return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");
}

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection("posts");
  const siteUrl = site?.toString() ?? "https://igbanam.com/";
  const base = siteUrl.endsWith("/") ? siteUrl : siteUrl + "/";

  function getDate(e: any): Date {
    if (e.data.date) return new Date(e.data.date);
    const inf = dateFromFilename(e.id);
    if (inf) return inf;
    return new Date(0);
  }
  const sorted = [...posts].sort((a,b)=>getDate(b).getTime()-getDate(a).getTime()).slice(0,10);

  const items = sorted.map(p => {
    const url = new URL(postUrl(p), base).toString();
    const date = getDate(p);
    const title = plainTitle(p.data.title || slugFromFilename(p.id) || "Untitled");
    const desc = p.data.description || excerptFromBody(p.body ?? "");
    // Use rendered body as description if available; fallback to plain
    return `    <item>
      <title>${escapeXml(title)}</title>
      <description>${escapeXml(desc)}</description>
      <pubDate>${date.toUTCString()}</pubDate>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml("Igbanam")}</title>
    <description>${escapeXml("Hard thoughts on software")}</description>
    <link>${escapeXml(base)}</link>
    <atom:link href="${escapeXml(new URL("feed.xml", base).toString())}" rel="self" type="application/rss+xml" />
    <pubDate>${new Date().toUTCString()}</pubDate>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Astro</generator>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
