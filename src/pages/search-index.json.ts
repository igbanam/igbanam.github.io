import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { slugFromFilename, postUrl, projectSlug, reviewSlug, excerptFromBody } from "../utils/slug";

export const GET: APIRoute = async () => {
  const posts = await getCollection("posts");
  const projects = await getCollection("projects");
  const reviews = await getCollection("reviews");

  const entries: Array<{ title: string; url: string; excerpt: string; tags: string[]; type: string }> = [];

  for (const p of posts) {
    entries.push({
      title: p.data.title || slugFromFilename(p.id) || "Untitled",
      url: postUrl(p),
      excerpt: p.data.description || excerptFromBody(p.body ?? ""),
      tags: (() => { const raw=(p.data.tags??p.data.tag) as unknown; return Array.isArray(raw)?raw as string[]: raw?[String(raw)]:[]; })(),
      type: "essay",
    });
  }
  for (const p of projects) {
    entries.push({
      title: p.data.title,
      url: `/projects/${projectSlug(p.id)}/`,
      excerpt: p.data.description || excerptFromBody(p.body ?? ""),
      tags: p.data.tech ?? (p.data.tag ? [p.data.tag] : []),
      type: "project",
    });
  }
  for (const r of reviews) {
    entries.push({
      title: r.data.title,
      url: `/reviews/${reviewSlug(r.id)}/`,
      excerpt: r.data.excerpt || r.data.verdict || "",
      tags: [],
      type: "review",
    });
  }

  return new Response(JSON.stringify(entries), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
