// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://igbanam.com",
  output: "static",
  integrations: [],
  markdown: {
    shikiConfig: {
      theme: "github-light",
      wrap: true,
    },
  },
  vite: {
    css: {
      transformer: "lightningcss",
    },
  },
});
