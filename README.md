# Odasy

> "Turn the world into your personal adventure"

Odasy is a mobile-first exploration platform that turns every trip into a gamified adventure — curated places, structured missions, geo-validated check-ins, a digital passport, stamps, and badges.

This repository is the **Odasy monorepo**: mobile, web, backend, domain, and AI layers, all in one place, so domain logic and types are defined once and consumed everywhere.

Full product documentation lives in [`odasy-docs`](https://github.com/odasy-tech/odasy-docs).

---

## 🧭 MVP in one sentence

A mobile app focused on the Colombian Coffee Region, with 25–35 curated places, 10–12 missions, geo-validated check-ins, a digital passport, XP and badge progression, and an initial AI layer for recommendations and short progress summaries.

---

## 📁 Repository structure

```
odasy/
├── apps/
│   ├── mobile/          # Expo + React Native (the explorer app)
│   └── admin/           # Next.js (content curation + tRPC host) — scaffolded later
├── packages/
│   ├── domain/          # Zod schemas, entities, pure business rules
│   ├── api/             # tRPC v11 router + typed client
│   ├── db/              # Drizzle schema + Neon (PostGIS + pgvector)
│   ├── ai/              # Vercel AI Gateway + deterministic fallbacks
│   ├── ui/              # Tamagui theme + shared primitives
│   ├── auth/            # Clerk wrappers for Expo and Next.js
│   └── config/          # Shared TS + Biome presets
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## 🛠️ Stack

One unified TypeScript stack from mobile to edge function. See `odasy-docs/technical/STACK.md` for the full rationale.

**Tooling:** pnpm 10 · Turborepo 2 · TypeScript 6 · Biome 2
**Mobile:** React Native 0.85 · Expo SDK 55 · Expo Router · React 19.2 · Reanimated 4 · Skia 2 · Mapbox GL
**API:** tRPC v11 · Zod 4
**Database:** PostgreSQL 16 (Neon) · Drizzle ORM · PostGIS · pgvector
**Auth:** Clerk
**AI:** Vercel AI Gateway · AI SDK v6 · Claude Haiku/Sonnet · OpenAI embeddings
**UI (shared):** Tamagui 1.144 (pinned to 1.x until 2.0 GA)
**State:** TanStack Query 5 + Zustand 5
**Observability:** PostHog · Sentry

See `STACK.md` "Pinned Versions" for exact versions.

---

## 🚀 Getting started

### Prerequisites

- **Node.js 24 LTS** (`nvm use 24`)
- **pnpm 10** (`npm i -g pnpm`)
- **Expo CLI** (comes with Expo SDK 55, run via `pnpm`)
- **Vercel CLI** for env management (`npm i -g vercel`)

**Mac not required** — iOS builds run in the cloud via EAS Build.

### First-time setup

```bash
# 1. Install dependencies for every workspace
pnpm install

# 2. Copy env template and fill in values (ask @nicpenaloza for dev credentials)
cp apps/mobile/.env.example apps/mobile/.env.local

# 3. Link Vercel (for env pull later)
vercel link

# 4. Pull environment variables from Vercel
vercel env pull apps/mobile/.env.local
```

### Run the mobile app

```bash
pnpm dev:mobile
# or
pnpm --filter @odasy/mobile dev
```

Then:
- Press **`a`** to open Android emulator
- Press **`i`** to open iOS simulator (Mac only)
- Scan the QR with **Expo Go** on a physical device (recommended on Windows)

### Typecheck / lint the whole monorepo

```bash
pnpm typecheck
pnpm lint
pnpm format        # Biome formatter
```

### Run tests

```bash
pnpm test
```

---

## 📦 Useful commands

| Command | What it does |
|---------|--------------|
| `pnpm dev` | Run every app's dev server in parallel |
| `pnpm dev:mobile` | Start the Expo dev server for mobile |
| `pnpm dev:admin` | Start Next.js for the admin (once scaffolded) |
| `pnpm build` | Build every app and package |
| `pnpm lint` | Run Biome across the monorepo |
| `pnpm typecheck` | Run TypeScript across the monorepo |
| `pnpm test` | Run Vitest across packages |
| `pnpm --filter @odasy/db db:generate` | Generate a new Drizzle migration |
| `pnpm --filter @odasy/db db:migrate` | Apply pending migrations |
| `pnpm --filter @odasy/mobile prebuild` | Generate native projects (when needed) |

---

## 📱 iOS builds from Windows

You do **not** need a Mac. For production iOS builds:

```bash
pnpm --filter @odasy/mobile exec eas build --platform ios --profile production
pnpm --filter @odasy/mobile exec eas submit --platform ios --latest
```

Expo EAS compiles on macOS in the cloud, signs with your certificates, and uploads to App Store Connect. For dev, use **Expo Go** on a physical iPhone via QR code.

---

## 👥 Team

| Role | Handle |
|------|--------|
| Co-founder / Developer | [@nicpenaloza](https://github.com/nicpenaloza) |
| Co-founder / Developer | [@klavijor](https://github.com/klavijor) |

See [`odasy-docs/technical/GIT_WORKFLOW.md`](https://github.com/odasy-tech/odasy-docs/blob/main/technical/GIT_WORKFLOW.md) for the work split and contribution conventions.

---

## 📚 Further reading

All product and technical documentation lives in the [`odasy-docs`](https://github.com/odasy-tech/odasy-docs) repository:

- `product/VISION.md` — 10-year vision
- `product/MVP_V1.md` — MVP scope and success criteria
- `product/MONETIZATION_PROPOSAL.md` — B2C, B2B, B2G revenue model
- `technical/STACK.md` — stack decisions and pinned versions
- `technical/ARCHITECTURE.md` — monorepo layout and patterns
- `technical/DATA_MODEL.md` — database schema (Drizzle + PostGIS + pgvector)
- `technical/GIT_WORKFLOW.md` — branching, commits, releases
