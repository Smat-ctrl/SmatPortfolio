# Future Admin Dashboard Plan

This document outlines how to extend the portfolio with an admin dashboard for editing content without touching code directly.

## Current State

Content lives in local TypeScript data files:

- `src/data/site.ts` — site config, hero copy, contact links
- `src/data/experience.ts` — work experience entries
- `src/data/projects.ts` — project entries
- `src/data/skills.ts` — skill categories

The site reads these at build time. To update content today, edit the relevant file and redeploy.

---

## Phase 1: Authentication

**Goal:** Protect admin routes so only you can edit content.

**Options:**

| Approach | Pros | Cons |
|---|---|---|
| NextAuth.js (Auth.js) | Well-supported, flexible providers | Requires setup |
| Clerk | Fast to integrate | External dependency |
| Simple password + session | Minimal setup | Less secure, DIY |

**Recommended:** NextAuth.js with a single admin user (credentials or GitHub OAuth).

**Routes to add:**

```
src/app/admin/login/page.tsx
src/app/api/auth/[...nextauth]/route.ts
src/middleware.ts          # protect /admin/*
```

**Environment variables:**

```
NEXTAUTH_SECRET=
NEXTAUTH_URL=
ADMIN_EMAIL=               # if using OAuth
# or ADMIN_USERNAME / ADMIN_PASSWORD_HASH for credentials
```

---

## Phase 2: Database

**Goal:** Move content from static TS files into a database for runtime CRUD.

**Options:**

| Database | Best for |
|---|---|
| SQLite (local file) | Simple self-hosted, no external service |
| Turso (hosted SQLite) | Serverless-friendly, edge-compatible |
| PostgreSQL (Neon/Supabase) | Full relational DB, good for production |

**Recommended starting point:** SQLite with Drizzle ORM or Prisma — keeps things local and simple, easy to migrate later.

**Schema sketch:**

```sql
-- projects
id, name, description, tech (JSON), highlights (JSON),
github_url, live_url, featured, sort_order, created_at, updated_at

-- experience
id, company, role, date, location, tech (JSON), bullets (JSON),
sort_order, created_at, updated_at

-- skills
id, category_name, skills (JSON), sort_order

-- site_config (single row or key-value)
key, value (JSON)
```

---

## Phase 3: Admin Dashboard UI

**Goal:** A clean dashboard to manage all portfolio content.

**Routes:**

```
src/app/admin/page.tsx              # dashboard overview
src/app/admin/projects/page.tsx     # list projects
src/app/admin/projects/new/page.tsx
src/app/admin/projects/[id]/page.tsx  # edit project
src/app/admin/experience/page.tsx
src/app/admin/experience/new/page.tsx
src/app/admin/experience/[id]/page.tsx
src/app/admin/skills/page.tsx
src/app/admin/site/page.tsx         # edit site config
```

**UI approach:**

- Reuse existing coffee-themed design tokens from `globals.css`
- Simple forms with validation (React Hook Form + Zod)
- Table/list views for projects and experience
- Drag-and-drop reordering for `order` fields (optional, nice-to-have)

---

## Phase 4: API Routes (CRUD)

**Goal:** Server-side endpoints for the dashboard to read/write data.

```
src/app/api/projects/route.ts         GET, POST
src/app/api/projects/[id]/route.ts    GET, PUT, DELETE
src/app/api/experience/route.ts       GET, POST
src/app/api/experience/[id]/route.ts  GET, PUT, DELETE
src/app/api/skills/route.ts           GET, PUT
src/app/api/site/route.ts             GET, PUT
```

All routes should:

1. Check authentication (session required)
2. Validate input with Zod schemas shared with the frontend
3. Return consistent JSON responses

---

## Phase 5: Frontend Data Layer Migration

**Goal:** Public site reads from the database instead of static files.

**Approach A — Build-time (ISR):**

- Fetch from DB during page render with revalidation
- Use `revalidatePath('/admin/projects')` after edits
- Good balance of performance and freshness

**Approach B — Runtime:**

- Server Components fetch directly from DB on each request
- Simpler, slightly slower

**Migration steps:**

1. Seed DB from existing `src/data/*.ts` files (one-time script)
2. Update section components to accept props from server-fetched data
3. Keep TypeScript types in `src/types/index.ts` — reuse for DB models
4. Optionally keep data files as fallback/seed source

---

## Phase 6: Optional Enhancements

- **Image uploads** — store project screenshots in `/public/uploads` or S3/R2
- **Draft/publish** — add `published: boolean` field, preview unpublished content
- **Audit log** — track who changed what and when
- **Markdown editor** — for longer project descriptions
- **Analytics** — simple view counter per project

---

## Suggested Implementation Order

1. Set up SQLite + Drizzle/Prisma with schema
2. Seed database from current data files
3. Add NextAuth login page
4. Build project list + edit forms
5. Build experience list + edit forms
6. Add skills and site config editors
7. Switch public pages to read from DB
8. Deploy with env vars on Vercel (use Turso if SQLite file isn't suitable)

---

## Files to Keep vs. Replace

| Keep | Replace / Extend |
|---|---|
| `src/types/index.ts` | `src/data/*.ts` → DB seed scripts |
| All UI components | Section components → accept server-fetched props |
| Design tokens in `globals.css` | — |
| `FUTURE_ADMIN_PLAN.md` | Update as you implement |

---

## Deployment Notes (Vercel)

- SQLite file DB won't persist on Vercel serverless — use **Turso** or **PostgreSQL** for production
- Set all auth and DB env vars in Vercel project settings
- Run migrations in CI or via a deploy script
- Consider protecting `/admin` with IP allowlist as an extra layer
