# Nadeem Tour & Travels — Website & Lead Management System

Premium travel & visa-assistance website (Next.js 16 · TypeScript · Tailwind CSS v4 · Prisma)
with a working lead-management backend and admin panel.

> **Going live?** Follow **[DEPLOY.md](./DEPLOY.md)** (Vercel) or **[NETLIFY.md](./NETLIFY.md)**
> (Netlify) — code → hosting platform, database → Neon PostgreSQL, step by step.

> **No database yet?** The site runs without one: public pages render from an embedded
> content snapshot, forms fall back to WhatsApp, and the admin panel stays off until you
> add `DATABASE_URL`. See **NETLIFY.md → “Option B”**.


> Your Journey. Our Expertise. — Visa Assistance • Flights • Hotels • Holiday Packages

## Quick start

```bash
npm install
cp .env.example .env        # then edit AUTH_SECRET if you like
npx prisma migrate dev      # creates the SQLite DB + tables
npm run db:seed             # admin user, visa services, destinations, packages, sample leads
npm run dev                 # http://localhost:3000
```

### Admin access (seeded)

- URL: `http://localhost:3000/admin/login`
- Email: `admin@nadeemtours.in`
- Password: `Admin@12345` — **change after first login** (edit `prisma/seed.ts` and re-seed,
  or update via the database).

## What's implemented

**Public website** — dark navy + gold premium design, fully responsive, SEO pages:

- Home (cinematic hero slideshow, service cards, USA B1/B2 feature, earlier-appointment form,
  Schengen, destinations, flights & hotels, packages, how-it-works, FAQ, CTA)
- `/visa-services` + per-country pages: `/usa`, `/schengen`, `/dubai`, `/saudi-arabia`,
  `/uk`, `/canada`, `/turkey`, `/other-countries` (driven by the DB)
- `/flights`, `/hotels` (quote-based flow), `/holiday-packages` + package detail pages
- `/destinations` + per-destination pages (each with visa links + package ideas)
- `/about`, `/contact`, legal pages (`/privacy-policy`, `/terms`, `/refund-policy`,
  `/visa-disclaimer`, `/cancellation-policy`)
- Floating WhatsApp button; every CTA/`wa.me` link carries a service-specific pre-filled message

**Lead management (real, working)**

- Every form submission (earlier appointment, visa pages, flights, hotels, packages,
  destinations, contact) is saved as a **lead** with an auto-number (`NT-10001`…) in the DB.
- Admin panel `/admin` — login (JWT session cookie), dashboard with today's overview,
  per-service counts and pipeline, and a leads table with search, status filters and
  one-click status updates (New → Contacted → Documents Pending → Processing → Submitted →
  Completed → Closed), plus a WhatsApp button that opens the customer's chat.
- **Admin content manager** — full create/edit/hide for visa services (`/admin/visa-services`),
  destinations (`/admin/destinations`) and holiday packages (`/admin/holiday-packages`).
  Slugs auto-generate (or set manually), each record has an order + live/hidden toggle,
  packages link to destinations and can be marked popular. Public pages refresh via ISR
  (5-minute revalidation) so edits appear without a redeploy.
- Built-in honeypot anti-spam on all forms. No “guaranteed appointment / 100% approval”
  claims anywhere — only the legally-safe disclaimers from the brief.

## Database

- Dev: SQLite at `prisma/dev.db` (no server to run).
- Prod: switch `provider` to `postgresql` in `prisma/schema.prisma` and point `DATABASE_URL`
  at managed Postgres, then `prisma migrate deploy`. The schema intentionally avoids
  DB-specific types (no enums/json) so the switch is clean.
- Tables: users (staff/admins), leads, customers, visa_services, visa_applications,
  visa_documents, appointments, destinations, holiday_packages, quotations, quotation_items,
  invoices, payments, admin_notes, contact_messages, website_settings.

## Scripts

| Command          | Purpose                                  |
| ---------------- | ---------------------------------------- |
| `npm run dev`    | Dev server                               |
| `npm run build`  | Production build                         |
| `npm run lint`   | ESLint                                   |
| `npm run db:migrate` | Create/apply migrations (dev)        |
| `npm run db:deploy`  | Apply migrations (production, Postgres) |
| `npm run db:seed`    | Seed admin, content and sample leads |
| `npm run db:studio` | Prisma Studio (visual DB browser)     |

## Roadmap (next sessions)

- Lead detail view with notes, assignment to staff, WhatsApp/email send
- Visa applications & document upload (private storage + access controls), quotations/invoices
- Umrah packages section, customer portal with status timeline
- Blog for SEO (visa guides), content updates from official sources
