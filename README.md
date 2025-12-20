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

## Environment Setup

- Supabase config lives under `supabase/config.toml` and `src/integrations/supabase/*`.
- Copy `.env.example` to `.env` and fill in values.

### Required Variables

```zsh
# .env
VITE_SUPABASE_URL="https://YOUR_PROJECT.supabase.co"
VITE_SUPABASE_ANON_KEY="YOUR_ANON_KEY"

# Admin access control (choose one)
# Exact allowed admin email
VITE_ADMIN_EMAIL="club-admin@yourdomain.com"
# OR allow any email under this domain
VITE_ADMIN_EMAIL_DOMAIN="yourdomain.com"
```

- Access in code via `import.meta.env.*` (e.g., `import.meta.env.VITE_SUPABASE_URL`).
- The Admin page is locked behind email/password auth and will only unlock for the configured admin email or domain.

### Supabase: Getting Keys & Admin User

- In Supabase Dashboard → Settings → API, copy the Project URL and `anon` key.
- In Supabase Dashboard → Authentication → Users:
  - Create a user with `VITE_ADMIN_EMAIL` and set a password.
  - This account will be able to sign in on `/admin`.

### Local Development

```zsh
cp .env.example .env
# edit .env with your values

npm run dev
```

### Email Notifications

Contact and membership submissions can automatically notify the admin via email. You have two options:

- Gmail SMTP (recommended if you use Gmail)
- Resend (simple email API)

Configure one of them.

#### Option A: Gmail SMTP (App Password)

1. Enable 2FA on the Gmail account to be used.
2. Create an App Password in Google Account → Security → App passwords.
3. Set these envs:

```zsh
vercel env add GMAIL_USER production           # yourgmail@gmail.com
vercel env add GMAIL_APP_PASSWORD production   # 16-char app password
vercel env add MAIL_FROM production            # optional, defaults to GMAIL_USER
vercel env add ADMIN_EMAIL production          # recipient admin address
```

Repeat for `preview` if needed:

```zsh
vercel env add GMAIL_USER preview
vercel env add GMAIL_APP_PASSWORD preview
vercel env add MAIL_FROM preview
vercel env add ADMIN_EMAIL preview
```

The API route [api/send-email.ts](api/send-email.ts) will use Gmail first if configured.

#### Option B: Resend

1. Create a Resend account and get the API key.
2. Verify a sender address (optional for custom `MAIL_FROM`).
3. Set envs:

```zsh
vercel env add RESEND_API_KEY production
vercel env add ADMIN_EMAIL production
vercel env add MAIL_FROM production            # optional, e.g., a verified sender
```

Repeat for `preview` if needed.

If Gmail envs are not set, the API will fallback to Resend.

### Vercel Environment Variables

Set the same variables in Vercel (Production, Preview, Development):

```zsh
# Supabase
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_ANON_KEY production
vercel env add VITE_ADMIN_EMAIL production   # or VITE_ADMIN_EMAIL_DOMAIN

# Repeat for preview & development if needed
vercel env add VITE_SUPABASE_URL preview
vercel env add VITE_SUPABASE_ANON_KEY preview
vercel env add VITE_ADMIN_EMAIL preview

# If using domain-based gating
vercel env add VITE_ADMIN_EMAIL_DOMAIN preview
```

Redeploy after updating envs.

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
