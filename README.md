# C&gt;Connect

The **Constructor University Bremen** ambassador platform — a place to connect,
where students, alumni and parents open doors for the next generation and carry
the spirit of Constructor out into the world.

Built from the *Constructor University Design System* handoff (Claude Design),
recreated as a real React + Vite app. The design medium was an HTML/CSS/JS
prototype; this is the production implementation of it.

## Stack

- **React 18** + **Vite 6** (plain JSX modules)
- Self-hosted **ALS Hauss** brand typeface + CU logos in `public/assets/`
- Constructor University design tokens (colors, type, spacing, shadows, motion)
  and core components live in `src/styles/` and `src/ds/`

## Getting started

```bash
npm install
npm run dev      # dev server (http://localhost:5174)
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Backend (optional — Supabase)

The app runs fully as a **no-login demo with mock data** out of the box. Connecting a
Supabase project makes the two ambassador uploads persist for real:

- **"Day in the life" videos** and **brochure receipts** upload to Supabase Storage and
  create a `submissions` row.
- The **Regional Manager** Notifications screen loads the real pending submissions and
  **approve/decline** writes the decision back.

Everything else stays mock for now. If no backend is configured, all of the above falls
back to today's simulated behaviour — the demo never breaks.

**Setup (one-time):**
1. Create a free project at [supabase.com](https://supabase.com).
2. In the Supabase **SQL editor**, paste and run [`supabase/schema.sql`](supabase/schema.sql)
   (creates the `submissions` table, the private `submissions` storage bucket, and
   demo-grade RLS policies).
3. Copy `.env.example` → `.env.local` and fill in `VITE_SUPABASE_URL` and
   `VITE_SUPABASE_ANON_KEY` (Supabase → Settings → API). The anon key is safe to ship.
4. For production, set the same two vars in **Vercel → Settings → Environment Variables**
   and redeploy.

> Security note: there is no auth yet, so the SQL ships **permissive demo policies** that
> let the public anon key read/write submissions — fine for the shared prototype, to be
> tightened when real login is added. Client-side, videos are capped at 200 MB.

The backend code is isolated in `src/lib/supabase.js` (client) and `src/lib/api.js` (the
only module screens import; it degrades gracefully when unconfigured).

## What's inside

The app reproduces the design's review surface: a side-rail role switcher next to
an iOS device frame. Four ambassador experiences:

- **Student / Alumni** — dashboard with Constructor-Theory tier progress, the
  schools map, school detail + history, the 2-step visit request → email preview →
  approval flow, log-visit (photos), fairs, the **Status** screen explaining the
  Catalyst → Builder → Constructor tiers, and profile.
- **Parent** — contribution dashboard, add-school / refer-student, contacts.
- **Regional Manager** — country inbox, request review (approve / decline & send),
  fair management, school database, ambassador activity.

## Project layout

```
src/
  ds/index.jsx        Core design-system components (Button, Card, Chip, …)
  styles/             Design tokens + component CSS (imported via index.css)
  icons.jsx           Lucide-style icon set (2px stroke, currentColor)
  data.js             Mock data
  ios-frame.jsx       iOS device bezel / status bar
  shell.jsx           AppBar, TabBar, MapView, TierLadder, TerminalProgress, …
  screens/student.jsx Student & Alumni screens
  screens/other.jsx   Parent & Regional Manager screens
  app.jsx             Router, role switcher, login & role-select
  Root.jsx            Review shell (rail + device frame)
  main.jsx            Entry point
```

## Brand notes

Voice is formal and institutional — "Constructor University Bremen", never "CU".
Tiers are named for Constructor Theory (Catalyst → Builder → Constructor). Icons
are [Lucide](https://lucide.dev)-style as a flagged substitute — no official CU
icon set was provided. See the design-system readme for full brand guidance.
