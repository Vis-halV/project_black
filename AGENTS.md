# Project Black — Repository Guidance

## Product principles

Project Black (currently branded in the UI as `feltnotsaid`) is an anonymous,
emotion-focused social platform. Its purpose is emotional resonance and the
comfort of discovering that others have felt something similar—not popularity
or competitive engagement.

- Keep authentication identity, anonymous public identity, and username as
  separate concepts. An authentication provider may know an account holder's
  real identity; that must never become public application content by default.
- Do not expose real names, email addresses, provider profile data, or other
  identifying details in public UI, posts, profiles, or notifications without
  an explicit product decision.
- Do not add likes, public like/comment counts, followers, popularity scores,
  reaction rankings, or any other public engagement metric.
- The intended empathy interaction is **"I felt the same"**. It must convey
  private empathy, not approval or popularity: do not display public totals or
  reveal the reacting user's real-world identity by default.
- Usernames are application identifiers, not identity proof. Onboarding should
  create a unique username once; trusted persistence must enforce uniqueness
  and ownership. A frontend availability check is never sufficient.
- Do not add user search or assume usernames are publicly discoverable unless
  the product owner explicitly approves that behavior.
- Prefer a quiet, respectful, distraction-free experience. Evaluate future
  work by emotional resonance, privacy, anonymity, and meaningful connection.

## Identity boundaries

Treat these as separate product concepts in every future design:

- **Authentication identity** is the private account identity that Clerk will
  establish when it is explicitly integrated. It must not automatically become
  public application identity.
- **Anonymous public identity** is how a participant may be represented in the
  anonymous social experience. It must not reveal names, email addresses,
  provider details, or other private account data by default. Its generation
  and stability are unresolved product decisions.
- **Username** is a unique application-level identifier selected during
  onboarding. It is not proof of real-world identity and is neither
  automatically public nor searchable. Do not expose it in posts,
  notifications, or public profiles unless the product owner approves that
  presentation.

The product protects anonymity by design, but cannot guarantee that a person's
writing style or contextual details will never reveal their identity. Avoid
adding identifying context and do not make stronger privacy promises.

## Empathy, not engagement

**"I felt the same"** expresses emotional resonance, not popularity. It must
never become a renamed like mechanism. Do not implement public reaction totals,
conventional likes or public like counts, public comment counts, follower
counts, popularity rankings, or similar engagement scores. Repeat behavior,
undo behavior, notification wording/delivery, and identity disclosure remain
owner decisions.

## Current architecture (evidence, not a roadmap)

- The active application is the Next.js App Router project in `frontend/`.
  `frontend/src/app/` contains routes and the root layout; shared UI is in
  `frontend/src/components/`; client utilities are in `frontend/src/lib/`.
- `frontend/src/app/layout.tsx` owns the HTML document and body, document
  metadata, and global CSS. It renders `src/components/Layout.jsx`, which owns
  the shared Header, main wrapper for route-specific content, Footer, and
  Vercel Analytics integration.
- Existing routes are `/`, `/about`, `/contact`, `/create`, `/explore`, and the
  App Router not-found UI. The create page is a placeholder. Explore currently
  renders local mock posts and client-side mood filters; it is not persisted
  social content.
- The contact form writes directly from the browser to the Firestore
  `contacts` collection through Firebase's client SDK. The checked-in Firebase
  module initializes only Firebase App and Firestore; no other Firebase service
  is evidenced.
- There is no authentication implementation, Clerk package/configuration,
  username model, post persistence, notification system, backend directory,
  API layer, database schema, tests, or retained Vite source in this checkout.
  Clerk with Google sign-in is planned, not implemented.
- `README.md` describes an earlier React/Vite deployment. Treat it as
  historical documentation; do not use it as evidence of the active runtime.
- Configuration belongs to each application directory. Firebase's public
  client configuration uses `NEXT_PUBLIC_FIREBASE_*` variables in the frontend;
  public Firebase configuration is not a substitute for privileged secrets.

## Security, authorization, and privacy

- Never commit secrets or print environment-file contents. Only expose values
  prefixed `NEXT_PUBLIC_` when they are genuinely safe for browser delivery.
- Authentication establishes account identity only. Public anonymous identity
  and usernames require deliberate application design and data separation.
- Validate every user-controlled value. Enforce authorization, ownership,
  username uniqueness, and write rules in a trusted backend or database rules;
  client-side checks and hidden UI are not access control.
- Keep private account data separate from public profile/post data. Design
  notifications, profiles, posts, and empathy interactions to preserve
  anonymity by default.
- When a backend or Clerk integration is added, protected operations must
  verify authenticated requests server-side; do not trust provider IDs supplied
  by the browser without verification.

## Shared development rules

- Inspect the implementation before editing. State clearly whether a feature
  is existing, planned, or unresolved; never claim an unimplemented feature
  exists.
- Make small, focused changes. Preserve working behavior and the current
  minimal visual identity; reuse established components/utilities and avoid
  speculative dependencies or architecture rewrites.
- Do not alter a separate backend, persistence model, or environment setup
  unless the requested work explicitly requires it. If a directory mentioned
  in a task is absent, report that fact rather than recreating it.
- Follow the closest nested `AGENTS.md` for directory-specific conventions.
  Use available lint, test, and build commands appropriate to the changed
  project, and report failures honestly.
- Record unresolved product choices instead of silently selecting a policy or
  implementing a speculative feature.

## Unresolved product decisions

The following are intentional open decisions; do not invent an implementation
without owner direction:

1. How anonymous public identities are generated and displayed, and whether
   they are stable across posts and sessions.
2. Whether a completed username can change, and how ownership stays unique.
3. Whether usernames are ever public, are only for future lookup, or enable
   user search/discoverability.
4. Whether "I felt the same" can be undone or repeated by the same account.
5. How empathy notifications are persisted/delivered and whether they reveal
   any anonymous identity.
6. Whether posts are public to all visitors or require authentication.
7. Whether reporting, blocking, moderation, post deletion, and account
   deletion will be supported; account deletion must define treatment of posts,
   usernames, and notifications.
