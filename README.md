# AI Marketing Creator Engine — Frontend

React + Vite + Tailwind (via Vite plugin), Framer Motion, Lucide, Axios, React Router.

## Getting Started

```bash
npm install
npm run dev
```

## Configuration

Create a `.env` file next to `package.json`:

```bash
VITE_WEBHOOK_URL=http://localhost:5678/webhook/861bcf17-78b0-4a82-82d2-1c560ae1d926
```

The app reads `VITE_WEBHOOK_URL` via `import.meta.env.VITE_WEBHOOK_URL`.

## History Storage (LocalStorage → Supabase)

- Default: uses `localStorage` in `src/utils/history.ts`.
- To switch to Supabase:
  1) Add a Supabase client and create a provider implementing the same functions (`getHistory`, `saveToHistory`, `deleteFromHistory`, `rerunEntry`).
  2) Replace imports in pages from `../utils/history` to your provider.
  3) Suggested table:

```
marketing_history (
  id bigint primary key,
  user_id uuid,
  type text check (type in ('image','video')),
  date timestamptz not null,
  inputs jsonb not null,
  output text not null
)
```

Store files in object storage and persist public URLs in `output`.
