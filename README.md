# C&gt;Connect

The **Constructor University Bremen** ambassador platform — a mobile, map-led app
that turns students, alumni and parents into recruiters, and gives the recruitment
team one place to approve and manage it all.

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
