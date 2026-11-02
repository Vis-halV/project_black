<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Frontend scope and architecture

This directory is the active Next.js 16 App Router frontend. The root
repository instructions define product, privacy, and shared security rules;
these instructions add frontend-specific conventions.

- Routes live in `src/app/`: `/`, `/about`, `/contact`, `/create`, `/explore`,
  plus `not-found.tsx`. Route folders use App Router special files; do not add
  React Router or revive the old misspelled `/exlpore` route.
- `src/app/layout.tsx` owns `<html>`, `<body>`, document metadata, and global
  CSS, then passes route content to `src/components/Layout.jsx`.
  `src/components/Layout.jsx` owns the shared Header, main wrapper, Footer, and
  Vercel Analytics. Pages render route-specific content only—do not duplicate
  shared chrome.
- Shared UI components are in `src/components/`; `src/lib/utils.js` provides
  `cn`; `src/lib/firebase.js` is the Firebase client/Firestore initialization.
  Prefer the configured `@/*` alias for `src/*` imports.
- Tailwind CSS v4 is configured in `src/app/globals.css`; preserve its
  CSS-first `@import "tailwindcss"` and `@theme` approach. Do not introduce
  Tailwind v3 directives/configuration styles.
- Remote Unsplash images are permitted through `next.config.ts`. Use
  `next/image` for new remote images and add narrowly scoped remote patterns
  before using a new host.

## Next.js implementation rules

- Read the relevant installed Next.js guide under `node_modules/next/dist/docs/`
  before changing Next.js behavior, as required by the generated block above.
- Pages and layouts are Server Components by default. Add `"use client"` only
  to the smallest component needing state, effects, handlers, browser APIs, or
  client routing. Keep the root layout server-rendered.
- Use `next/link` for internal navigation and `next/navigation` hooks only in
  Client Components when pathname or imperative navigation is required. Do not
  use `window.location` for normal in-app navigation or add React Router.
- Keep route metadata valid and imports compatible with TypeScript's strict
  configuration. Do not convert `.jsx` files to `.tsx` without a concrete need.
- Preserve the responsive header, active-navigation styling, accessible menu
  attributes, global spacing, and minimal visual style when changing shared UI.

## Firebase and planned Clerk integration

- Firebase is currently used only by the client-side contact form, which writes
  to Firestore. Its configuration expects `NEXT_PUBLIC_FIREBASE_*` values.
  Never put privileged credentials in those variables, commit values, or assume
  that a client-side Firestore call is authorization.
- Clerk and Google sign-in are product plans only: no Clerk dependency or source
  integration currently exists. Do not claim otherwise or introduce Clerk
  incidentally.
- When Clerk is explicitly added, treat it solely as authenticated account
  identity. Keep authentication identity, anonymous public identity, and
  usernames separate. Anonymous public identity generation/stability remains
  unresolved; a username is onboarding-selected, unique, non-public, and
  non-searchable unless the owner explicitly changes those rules.
- Never surface Clerk/provider names, emails, avatars, or real identity in
  public UI by default. Do not expose usernames in posts, notifications, or
  public profiles without approval. Verify protected requests in a trusted
  server/data layer; validate fields and enforce ownership and username
  uniqueness there.
- Follow the root-level empathy constraints: do not build user search, public
  reaction totals, conventional likes/public like counts, public comment
  counts, follower counts, or popularity rankings. "I felt the same" is
  emotional resonance, not a like; its repeat, undo, notification, and
  identity-disclosure behavior is unresolved.
- UI anonymity reduces exposure but cannot guarantee that writing style or
  contextual details will never identify someone. Do not promise otherwise or
  add unnecessary identifying context.

## Development commands

Run commands from `frontend/` using its npm lockfile:

```bash
npm run dev
npm run lint
npm run build
npm run start
```

There are no checked-in frontend tests or backend service in this checkout.
Run lint and a production build for changes where practical, and report exact
results rather than assuming success.
