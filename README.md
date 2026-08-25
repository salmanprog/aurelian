# AURELIAN — The Digital House

A cinematic men's object house. Not a storefront — a continuous narrative:
**film opening → editorial → exhibition → manifesto → craft film → material
explorer → the code → limited drop → private room → purchase.**

Every man has his own version of chaos. The house makes the objects.

---

## Deploying to a permanent URL

The app **bootstraps its own database schema and seed data on the first
request**. There is no migration step, no `drizzle-kit push` to run on the
host, and no build hook required. You only need a MySQL connection string.

The house is **MySQL-first** (this repo was converted from PostgreSQL). Use a
MySQL 5.7+/8.x or MariaDB 10.4+ database. The driver also accepts a
`MYSQL_*` variable set, so it works on any host.

### Vercel (recommended, ~3 minutes)

1. **Create a database.** PlanetScale, Railway, Clever Cloud and Aiven all
   provide managed MySQL on a free tier. For MariaDB-friendly hosts, Railway
   or a small VPS works too. Copy the connection string — it looks like
   `mysql://user:pass@host:port/dbname`.

   The connection string may be supplied either as `DATABASE_URL` or as
   individual variables:

   | Variable | Example |
   |---|---|
   | `DATABASE_URL` | `mysql://user:pass@host:3306/dbname` |
   | `MYSQL_HOST` | `db.example.com` |
   | `MYSQL_PORT` | `3306` |
   | `MYSQL_USER` | `aurelian` |
   | `MYSQL_PASSWORD` | `••••` |
   | `MYSQL_DATABASE` | `aurelian` |
   | `MYSQL_SSL` | `true` (managed providers that require TLS) |

2. **Push this repo to GitHub.**

   ```bash
   git init && git add -A && git commit -m "AURELIAN / House 001"
   git branch -M main
   git remote add origin https://github.com/<you>/aurelian.git
   git push -u origin main
   ```

3. **Import it at [vercel.com/new](https://vercel.com/new).** Framework is
   auto-detected as Next.js. No build settings need changing.

4. **Add the environment variable.** In *Project → Settings → Environment
   Variables*, add:

   | Key | Value |
   |---|---|
   | `DATABASE_URL` | your Neon / Vercel Postgres connection string |

   Add it for **Production**, **Preview** and **Development**.

5. **Deploy.** You get a permanent `https://<project>.vercel.app` URL plus
   automatic preview URLs for every branch.

6. **Open the site once.** The first page request creates all six tables and
   seeds the eight objects and five journal chapters.

### Other hosts

Any Node host works — Render, Railway, Fly.io, a VPS, Docker.

- **Build command:** `npm run build`
- **Start command:** `npm run start`
- **Environment:** `DATABASE_URL` (or the `MYSQL_*` variables) must be set.

For a plain VPS behind Nginx, `npm run build && npm run start` serves on port
3000. Process managers: `pm2 start npm -- start`.

> **TLS requirement.** PlanetScale, Aiven and most managed MySQL providers
> require SSL. Set `MYSQL_SSL=true` (or add `?ssl=true` / the appropriate
> query flag to `DATABASE_URL`). If the health check at `/api/health` fails
> after deploy, TLS is the first thing to check.

---

## Verifying the deployment

| Check | Expected |
|---|---|
| `/api/health` | `{"ok":true}` |
| `/api/products` | `{"count":8,...}` |
| `/` | Full cinematic entrance, then the hero |
| `/shop` | GRID / EDITORIAL toggle, filters |
| `/object/signature-bracelet` | Product landing page with gallery transition |
| `/journal` | Magazine index with full-bleed featured story |

---

## Replacing the placeholder films

The hero, manifesto, atelier, hallway and code-section films currently use
licensed stock footage matched to the brand's lighting language. All sources
live in **one object** — `FILM` in `src/lib/site.ts`.

To swap in finished campaign films, host the MP4s (Vercel Blob, S3, Bunny) and
update those URLs. Nothing else in the codebase needs to touch them.

Every video is already: muted, looping, `playsInline`, lazy-loaded via
IntersectionObserver with a poster frame shown first, and falls back to
still imagery on mobile and `prefers-reduced-motion`.

---

## Brand system

| Role | Token | Hex |
|---|---|---|
| Base | Obsidian | `#070707` |
| Surface | Charcoal | `#111111` |
| Surface | Graphite | `#242424` |
| Text | Soft Ivory | `#E8E4DA` |
| Detail | Antique Champagne Gold | `#B69A62` |
| Drop | Deep Maroon | `#3B1017` |
| Cool | Midnight Navy | `#0B1624` |
| Warm | Dark Espresso | `#241914` |

**Type.** Cormorant Garamond (display, uppercase, thin, tall) against Inter
(UI, small caps, `0.34em` tracking). Gold is used as a watch detail, never as
a gradient.

**Motion.** GSAP + ScrollTrigger + Lenis. Slow, controlled, heavy. Easing is
`power3.out` / `power4.out` / `expo.out`. Only `transform`, `opacity` and
`clip-path` are animated.

---

## Stack

- **Next.js 16** (App Router, Turbopack) — server components for data, client
  components for motion
- **Drizzle ORM + MySQL** (`mysql2`) — six tables, self-bootstrapping
- **GSAP 3 + ScrollTrigger + Lenis** — the entire motion system
- **Tailwind CSS v4** — tokens via `@theme` in `src/app/globals.css`

### Database / SQL files

The schema is defined once in `src/db/schema.ts` and can be provisioned three
ways (all equivalent):

1. **Let the app do it.** On the first request against an empty database,
   `src/db/bootstrap.ts` creates all six tables and seeds the catalogue — no
   CLI step.
2. **Import the SQL by hand.** `src/db/schema.mysql.sql` (DDL) and
   `src/db/seed.mysql.sql` (catalogue + journal, 8 objects / 5 chapters) are
   ready for any hosting provider's SQL console:
   ```bash
   mysql your_db < src/db/schema.mysql.sql
   mysql your_db < src/db/seed.mysql.sql
   ```
3. **Drizzle Kit.** `npx drizzle-kit push` (config in `drizzle.config.json`).

### Project structure

```
src/
├── app/
│   ├── page.tsx              # the full home narrative
│   ├── shop/                 # GRID + EDITORIAL discovery
│   ├── object/[slug]/        # product landing pages
│   ├── journal/              # the magazine + articles
│   └── api/                  # products, newsletter, access, checkout, health
├── components/
│   ├── home/                 # hero, chaos, manifesto, gallery, drop, materials, code
│   ├── object/               # product view + clip-path gallery
│   ├── shop/                 # shop experience
│   ├── journal/              # journal hero, story rows, article body
│   ├── site/                 # footer
│   └── system/               # shell, nav, cursor, bag, reveal primitives, video
├── db/
│   ├── schema.ts             # Drizzle tables (MySQL)
│   ├── bootstrap.ts          # runtime DDL + seed (idempotent, named-locked)
│   ├── schema.mysql.sql      # hand-importable schema (DDL)
│   ├── seed.mysql.sql        # hand-importable catalogue + journal
│   └── seed.ts               # the catalogue and journal content (source)
└── lib/
    ├── gsap.ts               # GSAP registration + easing constants
    └── site.ts               # brand copy, films, materials, nav, drop config
```

---

## API

| Route | Method | Purpose |
|---|---|---|
| `/api/health` | GET | DB connectivity probe |
| `/api/products` | GET | Catalogue, with `collection` / `material` / `maxPrice` filters |
| `/api/newsletter` | POST | `{"email","source"}` — dedupes on email |
| `/api/access` | POST | `{"email","note"}` — private room requests |
| `/api/checkout` | POST | `{"email","items"}` → reserves, returns a reference |

---

## Content editing

All product copy, journal articles and brand copy live in
`src/db/seed.ts` and `src/lib/site.ts` — no CMS required. Edit the seed and
the next deploy against a fresh database picks it up. To reseed an existing
database, drop the `products` and `journal_posts` tables and restart.
# aurelian
