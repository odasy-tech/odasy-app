# @odasy/admin

Next.js 16 content curation app for Odasy. Hosts the tRPC router consumed by the mobile app.

**Status:** placeholder. Scaffolding is deferred until the mobile MVP is stable, per the phased plan in `odasy-docs/product/MVP_V1.md`. When scaffolded, it lives under `apps/admin/` with:

- `app/api/trpc/[trpc]/route.ts` — tRPC handler on Vercel Fluid Compute
- `app/(dashboard)/places/` — CRUD for curated places with a geo picker
- `app/(dashboard)/missions/` — mission editor with place dependencies
- `app/(dashboard)/badges/` — badge rule editor
- Clerk-protected admin routes

This README serves as an architectural placeholder so the slot in the monorepo is reserved.
