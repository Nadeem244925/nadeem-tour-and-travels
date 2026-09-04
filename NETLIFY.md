# Deploying to Netlify — Step by Step

This guide deploys Nadeem Tour & Travels to **Netlify** with a cloud **PostgreSQL**
database. Read it top to bottom once before starting — it takes ~20 minutes.

> Why not just upload the project folder? Netlify needs to *build* the Next.js app
> (the admin panel and lead forms run server-side). The database cannot be a file —
> it lives in the cloud as PostgreSQL. You push the code; the data is created on the
> server side from the same seed used locally.

---

## ⚡ Option B — Deploy WITHOUT a database (site live in 5 minutes)

Don't want Neon/Postgres yet? **The public website works with zero database.**
The project ships with an embedded snapshot of all content (8 visa services,
15 destinations, 5 packages), and every page automatically uses it whenever the
`DATABASE_URL` environment variable is missing or unreachable.

**What works without a database:**

- ✅ Every public page — home, visa services, destinations, packages, flights, hotels, contact
- ✅ All enquiry forms — if the database is offline, the form still opens the customer's
  pre-filled **WhatsApp chat** so you don't lose a single lead
- ✅ No env vars needed at all — just import the repo and deploy

**What needs a database (add Neon later when you want it):**

- ❌ Saving leads in the dashboard (they go to WhatsApp instead)
- ❌ Admin login — shows a clear “Database is not connected” message

**How:** follow Part 5 → Part 6 → Part 9 below (GitHub → Netlify → domain), and **skip
Parts 2, 3, 4, 7**. Do not set `DATABASE_URL` on Netlify.

Later, when you're ready: complete Parts 2–4 (create Neon, `db push`, `db seed`),
add `DATABASE_URL` + `AUTH_SECRET` (Part 7), redeploy — the site upgrades in place
and admin + lead storage switch on automatically. Nothing else changes.

---

## Part 1 — Prepare the code (done, but verify)

These are already in the project — just confirm they exist:

- `netlify.toml` — build command `npm run build`, publish dir `.next`, Node 22.
- `prisma/schema.prisma` — `binaryTargets` includes `rhel-openssl-3.0.x`
  (needed because Netlify's serverless functions run on Amazon Linux).
- `package.json` — `postinstall: prisma generate` and `engines.node >= 20.9.0`.

## Part 2 — Create the database (Neon, free)

1. Go to **https://neon.tech** → sign up (free) → **Create a project**.
2. Region: choose one close to your visitors (e.g. `ap-south-1` Mumbai for India).
3. Copy the **connection string** — it looks like:
   ```
   postgresql://USER:PASSWORD@ep-xxxx.ap-south-1.aws.neon.tech/neondb?sslmode=require
   ```
   Keep it private. (Supabase works too — copy its URI connection string.)

## Part 3 — Switch the schema to PostgreSQL (one line)

In `prisma/schema.prisma`, change:

```prisma
datasource db {
  provider = "postgresql"   // was "sqlite"
  url      = env("DATABASE_URL")
}
```

## Part 4 — Create tables + upload your content

Run these from your PC, in the project folder. PowerShell:

```powershell
$env:DATABASE_URL="postgresql://USER:PASSWORD@ep-xxxx.ap-south-1.aws.neon.tech/neondb?sslmode=require"
npx prisma db push
npx prisma db seed
```

(Git Bash: `export DATABASE_URL="..."` instead.)

- `db push` creates all tables in Postgres.
- `db seed` loads your 8 visa services, 15 destinations, 5 packages + the admin user.
- Optional check: `npx prisma studio`.

> Don't replay the SQLite dev migrations on Postgres — they're SQLite-flavoured.
> `db push` is the right tool here.

## Part 5 — Put the code on GitHub (needed for Netlify deploys)

1. Create a repository at **https://github.com/new** (any name, e.g. `nadeem-tour-travels`).
2. From the project folder:
   ```bash
   git init
   git add .
   git commit -m "Nadeem Tour & Travels"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/nadeem-tour-travels.git
   git push -u origin main
   ```
   (Enter your GitHub username/token when prompted.)

## Part 6 — Create the Netlify site

1. Go to **https://app.netlify.com** → sign up → **Add new site → Import an existing project**.
2. Choose **GitHub** → authorise → pick the `nadeem-tour-travels` repository.
3. Netlify auto-detects Next.js. Confirm the settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - (Both are already set in `netlify.toml`, so leave the fields as detected.)
4. Click **Deploy site** — Netlify installs, generates Prisma, builds, and publishes.

## Part 7 — Add the environment variables

Still in the Netlify site dashboard:

**Site configuration → Environment variables → Add a variable** (twice):

| Key | Value |
|---|---|
| `DATABASE_URL` | your Neon connection string |
| `AUTH_SECRET` | a long random string (generate: `openssl rand -base64 32`) |

Then **Deploys → Trigger deploy → Deploy site** once more so the build picks them up.
(Skip the `NEXT_PUBLIC_*` variables — the code reads site name/phone from
`src/lib/site.ts`, not from env.)

## Part 8 — Verify it works

Netlify gives you a URL like `https://nadeem-tour-travels.netlify.app`.

1. Open it — the site must look exactly like your local version.
2. Check `/visa-services`, `/destinations`, `/holiday-packages` — content comes from Postgres.
3. Go to `/admin/login` → sign in: **admin@nadeemtours.in / Admin@12345**.
4. Submit an enquiry on `/contact` → it must appear at `/admin/leads`.

Then, before sharing the link:
- **Change the admin password** (rotate `Admin@12345`).
- **Delete the 5 demo leads** via Prisma Studio (`npx prisma studio` with `DATABASE_URL` set).
- Use a **real** `AUTH_SECRET` (already done in Part 7).

## Part 9 — Custom domain (optional)

Netlify dashboard → **Domain management → Add a domain** → follow the DNS instructions
(for Netlify DNS, just change nameservers; for an external registrar, add the CNAME/A
records Netlify shows). HTTPS certificate is issued automatically.

---

## Updating the site later

- **Content** (visas, destinations, packages): edit in the admin panel — public pages
  revalidate every 5 minutes (ISR), no redeploy needed.
- **Code**: `git push` to GitHub → Netlify deploys automatically.
- **Schema changes**: edit `schema.prisma`, then `npx prisma db push` with
  `DATABASE_URL` set to the Neon string.

---

## Troubleshooting (Netlify)

| Symptom | Fix |
|---|---|
| Site deploys but `/admin` shows "404" or plain HTML | The build published static output instead of the Next runtime. Ensure publish dir is `.next`; if it still falls back, uncomment the `@netlify/plugin-nextjs` plugin in `netlify.toml` and redeploy. |
| Build fails `Can't reach database server` | `DATABASE_URL` not set or misspelled in Netlify env vars; database not created yet (Part 2). |
| Build fails `Query engine ... could not be found` | Confirm `rhel-openssl-3.0.x` is in `binaryTargets`, run `npx prisma generate`, commit, redeploy. |
| Live site shows no content | `prisma db push` + `db seed` were not run against the Neon URL (Part 4). |
| Admin login says invalid credentials | Seed didn't reach Postgres, or password was changed. Re-run `npx prisma db seed` with `DATABASE_URL` set. |
| Content edits don't appear | ISR caches up to 5 minutes — wait and hard-refresh. |
| First admin page load is slow | Normal serverless cold start. |
| Changed `AUTH_SECRET` → logged out | Expected; sign in again. |

---

## Alternative without GitHub (Netlify CLI)

```bash
npm install -g netlify-cli
netlify login
netlify init          # link to a new site
netlify env:set DATABASE_URL "postgresql://…"
netlify env:set AUTH_SECRET "…"
netlify deploy --prod
```