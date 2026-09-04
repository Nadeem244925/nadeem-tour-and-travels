# Deploying Nadeem Tour & Travels

This guide takes the project from your PC to a live website with a real database.

**Read this first — the short version of "how to deploy all files with database":**

1. You do **not** upload the SQLite file. SQLite cannot run on serverless hosting
   (the filesystem is read-only and temporary).
2. You deploy the **code** to a hosting platform and create a **managed PostgreSQL**
   database in the cloud, then push your content into it.
3. Recommended stack (matches the project design): **Vercel** (hosting) + **Neon**
   or **Supabase** (PostgreSQL). Both have generous free tiers.

Two production tweaks are already in this codebase:

- `prisma/schema.prisma` declares `binaryTargets = ["native", "debian-openssl-3.0.x"]`
  so Prisma's query engine exists for Vercel's Linux runtime.
- `package.json` has a `postinstall` script (`prisma generate`) and a
  `db:deploy` script.

---

## Step 0 — Prerequisites

- A [GitHub](https://github.com) account (free) — or you can skip Git and use the
  Vercel CLI directly.
- A [Neon](https://neon.tech) or [Supabase](https://supabase.com) account (free).

---

## Step 1 — Create the PostgreSQL database (5 minutes)

1. Sign in to **Neon** → **Create a project** → pick a region close to your visitors
   (e.g. `ap-south-1` for India) → **Create**.
2. Copy the **connection string** (looks like):
   ```
   postgresql://USER:PASSWORD@ep-xxxx.ap-south-1.aws.neon.tech/neondb?sslmode=require
   ```
   Keep the default `neondb` database name — it's fine.
3. (Supabase alternative) Project → **Connect** → copy the **URI connection string**
   (not the transaction-pooler one if you plan to use `db push`).

> Keep this string private — treat it like a password.

---

## Step 2 — Switch the schema to PostgreSQL

The project develops on SQLite; production runs PostgreSQL. In
`prisma/schema.prisma`, change one line:

```prisma
datasource db {
  provider = "postgresql"   // was "sqlite"
  url      = env("DATABASE_URL")
}
```

That's the **only** code difference — the schema deliberately avoids SQLite-only
features so nothing else changes.

---

## Step 3 — Create tables + load your content into Postgres

From your PC (with the terminal in the project folder), using your Neon string:

```bash
# 1) Point the environment at Postgres (PowerShell)
$env:DATABASE_URL="postgresql://USER:PASSWORD@ep-xxxx.ap-south-1.aws.neon.tech/neondb?sslmode=require"

# (Git Bash)
# export DATABASE_URL="postgresql://USER:PASSWORD@ep-xxxx.ap-south-1.aws.neon.tech/neondb?sslmode=require"

# 2) Create all tables directly from the schema
npx prisma db push

# 3) Load your content + admin user (same content as your local seed)
npx prisma db seed
```

`db push` is used here instead of replaying the SQLite dev migrations — the dev
migration files are SQLite-flavoured and must not be replayed on Postgres.
(For a project of this size `db push` is the cleanest path; if you later want a
proper migration history on Postgres, delete `prisma/migrations/`, then run
`npx prisma migrate dev --name init` against the Postgres URL once.)

Check your data landed (optional):

```bash
npx prisma studio    # visual browser — you should see 8 visa services etc.
```

> The seed also creates the admin login (`admin@nadeemtours.in`) and 5 **sample**
> demo leads. Delete the demo leads in Prisma Studio before going live if you
> don't want them in your real database.

---

## Step 4 — Deploy the code to Vercel

### Option A — via GitHub (recommended, automatic on every push)

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) → **Import** the repository.
3. Vercel auto-detects **Next.js**. **Framework preset: Next.js**.
4. In **Environment Variables** add (exact names matter):

   | Name | Value | Notes |
   |---|---|---|
   | `DATABASE_URL` | your Neon connection string | secrets are encrypted by Vercel |
   | `AUTH_SECRET` | a long random string | generate: `openssl rand -base64 32` |

   (The `NEXT_PUBLIC_*` variables from `.env.example` are **not** read by the
   current code — site name/phone live in `src/lib/site.ts`. You can set them
   anyway; they're harmless.)
5. Click **Deploy**. Vercel will install, run `prisma generate`, build (pages that
   query the DB are generated against your Postgres), and go live.

### Option B — Vercel CLI (no Git needed)

```bash
npm i -g vercel
vercel login
vercel env add DATABASE_URL     # paste your Neon string when prompted
vercel env add AUTH_SECRET
vercel --prod
```

---

## Step 5 — Verify

- Open your live URL — the site should look exactly like local.
- Visit `/visa-services`, `/destinations`, `/holiday-packages` — content should be
  present (it comes from Postgres).
- Visit `/admin/login` → sign in with `admin@nadeemtours.in` / `Admin@12345`.
- Submit a test enquiry on `/contact` → the lead should appear at `/admin/leads`
  (this proves the whole loop works against the real database).

Then immediately:

1. **Change the admin password** — edit the admin user's password hash, or add a
   "change password" feature, before sharing the URL.
2. **Set a real `AUTH_SECRET`** (do this before anyone logs in; changing it later
   logs everyone out, which is fine).
3. **Remove demo leads** from the database.

---

## Step 6 — Go live properly

- **Domain**: Vercel project → **Settings → Domains** → add your domain (e.g.
  `nadeemtourandtravels.com`). DNS: point it at Vercel (they give you the records).
- **Search engines**: submit your sitemap at `https://yourdomain.com/sitemap.xml`
  (Next.js generates one automatically — a robots entry exists for it) via Google
  Search Console.
- **WhatsApp number**: it's hard-coded in `src/lib/site.ts` — already set to
  `+91 83848 41986`. Everything on the site links out to it.

---

## Updating the live site later

**Content (visa services, destinations, packages):** edit in the admin panel —
public pages use ISR (5-minute revalidation), so changes appear within ~5 minutes,
no redeploy needed.

**Code changes:** push to GitHub → Vercel redeploys automatically.

**Schema changes** (new fields/tables): edit `schema.prisma`, then from your PC:

```bash
$env:DATABASE_URL="<your neon string>"
npx prisma db push        # applies changes to Postgres
```

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| Build fails with `Query engine library ... could not be found` | Confirm `binaryTargets` (done above) and redeploy. |
| Build fails: `Can't reach database server` | `DATABASE_URL` missing/typo in Vercel env vars; Neon region reachable from Vercel region. |
| `Error: The table does not exist` on live but fine locally | You haven't run `prisma db push` + seed against the Postgres URL (Step 3). |
| Admin login "Invalid email or password" on live | Seed didn't run against Postgres, or password was changed. Re-run `npx prisma db seed` with `DATABASE_URL` set. |
| Content edits don't appear | ISR caches up to 5 minutes — wait and hard-refresh. |
| `AUTH_SECRET` changed → everyone logged out | Expected. Re-login with admin credentials. |
| Slow first admin page | Serverless cold start; normal. Admin pages aren't pre-rendered. |

---

## Alternative hosts (if you prefer not to use Vercel)

- **Railway / Render / Fly.io** — deploy a Node service (`npm run build && npm run start`)
  with a persistent disk or an attached Postgres. Works, but you manage the service.
- **Shared hosting + Node** — possible with the static-ish marketing pages, but the
  admin panel and Prisma need a real Node runtime; a VPS (e.g. Hostinger/DO droplet)
  is the practical floor. Vercel + managed Postgres remains the least-maintenance
  option and matches the spec's architecture.
