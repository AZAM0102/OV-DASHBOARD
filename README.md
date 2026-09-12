# OV DASHBOARD — Full Website Frontend v1.0

Fresh isolated Next.js project for the OV DASHBOARD product, focused on Amazon, Flipkart and Meesho sellers.

## Included routes

- `/` — Dashboard
- `/orders` — Orders management
- `/inventory` — Inventory and marketplace stock
- `/returns` — Returns management
- `/shipping` — Shipping & bulk labels UI
- `/analytics` — Sales and marketplace analytics
- `/ai-assistant` — AI seller copilot UI
- `/marketplace` — Amazon / Flipkart / Meesho connections
- `/settings` — Seller settings
- `/billing` — Subscription and invoices

## Architecture

- Shared shell and navigation: `components/layout.tsx`
- Shared UI: `components/ui.tsx`
- Typed prototype data: `lib/data.ts`
- Route-specific UI under `app/`

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Run a production compile with:

```bash
npm run build
```

## Backend status

This is the complete frontend/product prototype. Marketplace APIs, Supabase persistence, authentication, live order/inventory sync, real label generation, payments and production AI are intentionally not connected yet. The UI/data separation is ready for those integrations.
