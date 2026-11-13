# Igbanam — Hard thoughts on software

Astro-powered editorial publication. Design: *The Marginalia Terminal* — see [DESIGN-SPEC.md](DESIGN-SPEC.md).

## Development

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # output to dist/
npm run preview
```

## Content

Markdown remains the source of truth in the original Jekyll locations:

- `_posts/` → essays (date-based URLs: `/YYYY/MM/DD/slug/`)
- `_projects/` → projects (`/projects/<slug>/`)
- `_reviews/` → reviews (`/reviews/<slug>/`)

Front matter is normalized — new editorial fields (`hot_take`, `spiciness`, `stance`, `series`, `status`, `tech`, `github`, `rating`, `verdict`) are optional.

## Deployment

GitHub Pages via GitHub Actions — see `.github/workflows/deploy.yml`. Custom domain: `igbanam.com`.

## Design tokens

See `src/styles/tokens.css` and `src/styles/global.css`.
