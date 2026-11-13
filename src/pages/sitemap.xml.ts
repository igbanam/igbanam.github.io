import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { postUrl, projectSlug, reviewSlug, normalizeTags } from "../utils/slug";

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.toString() ?? "https://igbanam.com/";
  const base = siteUrl.replace(/\/$/, "");

  const posts = await getCollection("posts");
  const projects = await getCollection("projects");
  const reviews = await getCollection("reviews");

  const urls: string[] = [
    `${base}/`,
    `${base}/blog/`,
    `${base}/projects/`,
    `${base}/reviews/`,
    `${base}/categories/`,
    `${base}/about/`,
    `${base}/feed.xml`,
    `${base}/search/`,
  ];

  for (const p of posts) urls.push(`${base}${postUrl(p)}`);
  for (const p of projects) urls.push(`${base}/projects/${projectSlug(p.id)}/`);
  for (const r of reviews) urls.push(`${base}/reviews/${reviewSlug(r.id)}/`);

  // tag pages
  const tags = new Set<string>();
  for (const p of posts) {
    const raw = (p.data.tags ?? p.data.tag) as unknown;
    const arr: string[] = Array.isArray(raw) ? raw as string[] : raw ? [String(raw)] : [];
    for (const t of arr) tags.add(String(t).toLowerCase());
  }
  for (const t of tags) urls.push(`${base}/tags/${encodeURIComponent(t)}/`);

  const now = new Date().toISOString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u}</loc><lastmod>${now}</lastmod></url>`).join("\n")}
</urlset>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
