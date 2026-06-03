# Samuel Mathew — Portfolio

A personal portfolio website built with Next.js, TypeScript, Tailwind CSS, and Motion.

## Getting started

```bash
npm install
cp .env.example .env.local   # required — Next.js ignores .env.example
# Edit .env.local with your ADMIN_* and SESSION_SECRET values
npm run dev
```

**Important:** Run `npm run dev` from the project root (`Portfolio/`), not from `src/app`. Otherwise images and the resume PDF will 404.

Restart the dev server after creating or changing `.env.local`.

Open http://localhost:3000

## Admin dashboard (no coding required)

Manage projects and work experience at **http://localhost:3000/admin/login**

1. Copy `.env.example` to `.env.local`
2. Set your credentials:

```
ADMIN_KEYWORD=your-secret-keyword
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-password
SESSION_SECRET=at-least-32-random-characters-long
```

3. Sign in with keyword + username + password
4. Add, edit, or delete projects and experience — changes appear on the site immediately

### Deployed admin (Vercel)

Local file storage does not persist on Vercel. Add free [Upstash Redis](https://upstash.com) and set in Vercel env:

```
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

Also set all `ADMIN_*` and `SESSION_SECRET` variables in Vercel project settings.

## Editing content (code)

Default seed data lives in `src/data/`. The site reads from `content/portfolio.json` (local) or Upstash (production) when admin saves.

| File | What to edit |
|---|---|
| `site.ts` | Name, hero text, contact links |
| `skills.ts` | Skill categories |
| `projects.ts` / `experience.ts` | Initial seed data |

## Resume

Replace `public/resume.pdf` with your real resume. It previews in the hero and opens from the navbar.

## Deploy

```bash
npm run build
```

Deploy to [Vercel](https://vercel.com). Set environment variables for admin if you want the dashboard in production.

## Troubleshooting

If you see `__webpack_modules__[moduleId] is not a function`:

```bash
npm run clean
npm run dev
```

Stop duplicate dev servers first.
