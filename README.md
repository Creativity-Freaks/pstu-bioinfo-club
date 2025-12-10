# PSTU Bioinfo Club ✨

Your gateway to bioinformatics at PSTU — workshops, blogs, mentorship, events, and resources — wrapped in a fast, modern, and elegant web experience.

![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white) ![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white) ![Tailwind](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwindcss&logoColor=white) ![Supabase](https://img.shields.io/badge/Supabase-2.x-3FCF8E?logo=supabase&logoColor=white)

## Overview

- A performant, responsive site built with Vite + React + TypeScript and Tailwind CSS.
- Polished UI with shadcn/ui + Radix primitives and lucide icons.
- Routing-driven pages: Home, Blog, Events, Courses, Team, Mentorship, About, Workshops, Gallery.
- Supabase-ready integrations for data and auth (future-friendly).

### Live Preview (Local)

- Homepage: `src/pages/Index.tsx` — includes `HeroPreview`, `AboutPreview`, `EventsPreview`, `CoursesPreview`, `TeamPreview`, `Testimonials`, `Resources`, `Partners`, `FAQ`, `Contact`, `Footer`.
- Blog: `src/pages/BlogPage.tsx` — featured post, categories, grid, newsletter block.
- Events: `src/pages/EventsPage.tsx` — upcoming workshops/seminars, past events, stats.

## Highlights

- Elegant component library: buttons, cards, dialogs, toasts, forms (`src/components/ui/*`).
- Engaging sections: hero, previews, testimonials, resources, partners, FAQ, contact.
- Rich content pages:
  - `Index` (Homepage) — previews of About, Events, Courses, Team, and more.
  - `BlogPage` — featured article, categories, grid of posts, newsletter signup.
  - `EventsPage` — upcoming workshops/seminars, past events, vibrant stats.
  - Plus: `CoursesPage`, `TeamPage`, `MentorshipPage`, `AboutPage`, `WorkshopsPage`, `GalleryPage`, `FoundingPage`.

## Tech Stack

- Vite (SWC) + React 18
- TypeScript
- Tailwind CSS + tailwind-merge + tailwindcss-animate
- shadcn/ui + Radix UI
- lucide-react icons
- Supabase client (`@supabase/supabase-js`)
- React Router (`react-router-dom`)
- TanStack Query (prepared for data fetching)

## Project Structure

- `src/pages/` — route pages (e.g., `Index.tsx`, `BlogPage.tsx`, `EventsPage.tsx`).
- `src/components/` — site sections and UI primitives.
- `src/hooks/` — utilities like `use-mobile` and toasts.
- `src/integrations/supabase/` — `client.ts`, `types.ts` for backend integration.
- `public/` — static assets.
- `tailwind.config.ts`, `vite.config.ts` — core tooling configs.

Alias: use `@` for `./src` (e.g., `import Navigation from "@/components/Navigation"`).

## Quickstart

### Requirements

- Node.js 18+
- `npm` or `bun`

### Install

```zsh
# using bun
bun install

# or using npm
npm install
```

### Develop

```zsh
# start dev server with HMR
bun run dev
# or
npm run dev
```

### Build & Preview

```zsh
# build production assets
bun run build
# or
npm run build

# locally preview the production build
bun run preview
# or
npm run preview
```

## Key Scripts

- `dev` — start Vite dev server
- `build` — production build
- `build:dev` — dev-mode build (faster, non-minified)
- `preview` — preview build locally
- `lint` — run ESLint across the repo

## Environment & Config

- Supabase config lives under `supabase/config.toml` and `src/integrations/supabase/*`.
- If you add environment variables (e.g., for Supabase URL and anon key), create a `.env` and wire via `vite.config.ts` or `import.meta.env`.

Example (not committed):

```zsh
# .env
VITE_SUPABASE_URL="https://YOUR_PROJECT.supabase.co"
VITE_SUPABASE_ANON_KEY="YOUR_ANON_KEY"
```

Access via: `const url = import.meta.env.VITE_SUPABASE_URL`

## Deployment

- Static hosting friendly (Netlify, Vercel, Cloudflare Pages, GitHub Pages).
- Build with `npm run build` (or `bun run build`) and deploy `dist/`.

## Contributing

- Fork and branch per feature.
- Keep PRs focused and small.
- Run `npm run lint` and ensure the site builds.
- See `CONTRIBUTING.md` for details.

## Credits

- Built with love by PSTU Bioinfo Club members and contributors.
- UI components inspired by shadcn/ui and Radix.

## License

MIT — see `LICENSE`.
