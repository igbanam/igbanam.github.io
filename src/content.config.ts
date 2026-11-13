import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./_posts" }),
  schema: z.object({
    title: z.string().nullable().optional().default(""),
    date: z.coerce.date().optional(),
    author: z.string().optional(),
    description: z.string().nullable().optional().default(""),
    excerpt: z.string().optional(),
    categories: z.union([z.string(), z.array(z.string())]).optional(),
    category: z.union([z.string(), z.array(z.string())]).optional(),
    tags: z.union([z.string(), z.array(z.string())]).optional(),
    tag: z.union([z.string(), z.array(z.string())]).optional(),
    layout: z.string().optional(),
    permalink: z.string().optional(),
    image: z.string().nullable().optional(),
    headerImage: z.boolean().optional(),
    locale: z.string().optional(),
    // Editorial extensions (optional, per DESIGN-SPEC 3)
    hot_take: z.string().optional(),
    spiciness: z.string().optional(),
    stance: z.string().optional(),
    series: z.string().optional(),
    series_order: z.number().optional(),
    cover_seed: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./_projects" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    author: z.string().optional(),
    layout: z.string().optional(),
    description: z.string().optional().default(""),
    excerpt: z.string().optional(),
    categories: z.union([z.string(), z.array(z.string())]).optional(),
    category: z.string().optional(),
    projects: z.boolean().optional(),
    tag: z.string().optional(),
    tags: z.array(z.string()).optional(),
    // New fields per spec
    status: z.enum(["shipped", "in-progress", "abandoned"]).optional(),
    tech: z.array(z.string()).optional(),
    github: z.string().url().optional(),
    featured: z.boolean().optional(),
  }),
});

const reviews = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./_reviews" }),
  schema: z.object({
    title: z.string(),
    layout: z.string().optional(),
    excerpt: z.string().optional(),
    // New fields per spec
    rating: z.number().min(0).max(5).optional(),
    verdict: z.string().optional(),
    author: z.string().optional(),
    published: z.coerce.date().optional(),
    cover_seed: z.string().optional(),
  }),
});

export const collections = { posts, projects, reviews };
