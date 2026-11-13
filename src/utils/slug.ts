/** Derive slug from Jekyll post filename: YYYY-MM-DD-slug.md → slug */
export function slugFromFilename(id: string): string {
  // id is like "2024-05-16-On-monorepo-vs-multirepo.md" or "2024-05-16-on-monorepo-vs-multirepo"
  const base = id.replace(/\.md$/, "");
  const match = base.match(/^\d{4}-\d{2}-\d{2}-(.+)$/);
  if (match) return match[1].toLowerCase();
  return base.toLowerCase();
}

export function dateFromFilename(id: string): Date | null {
  const m = id.match(/^(\d{4})-(\d{2})-(\d{2})-/);
  if (!m) return null;
  return new Date(`${m[1]}-${m[2]}-${m[3]}T00:00:00Z`);
}

export function normalizeTags(entry: { tags?: unknown; tag?: unknown }): string[] {
  const raw = entry.tags ?? entry.tag;
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.map(String).map((s) => s.trim().toLowerCase()).filter(Boolean);
  if (typeof raw === "string") return [raw.trim().toLowerCase()].filter(Boolean);
  return [];
}

export function normalizeCategories(entry: { categories?: unknown; category?: unknown }): string[] {
  const raw = entry.categories ?? entry.category;
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.map(String).map((s) => s.trim().toLowerCase()).filter(Boolean);
  if (typeof raw === "string") return [raw.trim().toLowerCase()].filter(Boolean);
  return [];
}

export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" });
}

export function postUrl(entry: { id: string; data: { date?: Date; permalink?: string } }): string {
  if (entry.data.permalink) return entry.data.permalink.endsWith("/") ? entry.data.permalink : entry.data.permalink + "/";
  // Preserve legacy Jekyll-style date URLs as canonical: /YYYY/MM/DD/slug/
  // But also accept clean /blog/slug/ - we use date-based as primary
  const slug = slugFromFilename(entry.id);
  // If date exists, use date-based URL matching Jekyll default
  if (entry.data.date) {
    const d = entry.data.date;
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `/${y}/${m}/${day}/${slug}/`;
  }
  const inferred = dateFromFilename(entry.id);
  if (inferred) {
    const y = inferred.getUTCFullYear();
    const m = String(inferred.getUTCMonth() + 1).padStart(2, "0");
    const day = String(inferred.getUTCDate()).padStart(2, "0");
    return `/${y}/${m}/${day}/${slug}/`;
  }
  // Fallback: /blog/slug/
  return `/blog/${slug}/`;
}

export function projectSlug(id: string): string {
  const base = id.replace(/\.md$/, "");
  const m = base.match(/^\d{4}-\d{2}-\d{2}-(.+)$/);
  if (m) return m[1].toLowerCase();
  return base.toLowerCase();
}

export function reviewSlug(id: string): string {
  return id.replace(/\.md$/, "").toLowerCase();
}

export function excerptFromBody(body: string, maxLen = 160): string {
  const plain = body
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]+)\]\(.*?\)/g, "$1")
    .replace(/^#+\s*/gm, "")
    .replace(/[*_~]/g, "")
    .replace(/\n+/g, " ")
    .trim();
  if (plain.length <= maxLen) return plain;
  return plain.slice(0, maxLen).trimEnd() + "…";
}

/** Deterministic hash from string → array of ints for generative art */
export function seedInts(seed: string, count = 5): number[] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (Math.imul(31, h) + seed.charCodeAt(i)) >>> 0;
  const out: number[] = [];
  for (let i = 0; i < count; i++) {
    h = Math.imul(1664525, h) + 1013904223;
    h >>>= 0;
    out.push(h);
  }
  return out;
}
