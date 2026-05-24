# Beyker Consulting — Monorepo

## Structure

```
beyker-consulting/
├── apps/
│   └── web/                    # marketing site — not built yet
├── packages/
│   └── design-system/          # @bk/design-system
│       ├── src/tokens/         # tokens.json (DTCG format) — source of truth
│       ├── src/styles/         # generated CSS variables + component styles
│       ├── src/components/     # React components
│       ├── src/primitives/     # layout primitives
│       ├── stories/            # Storybook stories + MDX docs
│       ├── exports/            # reference PNGs (git-ignored)
│       └── STYLE_GUIDE.md
├── vercel.json                 # deploys Storybook to Vercel
└── biome.json                  # lint + format config
```

## Quick start

```bash
pnpm install
pnpm -F @bk/design-system tokens:build   # regenerate CSS vars + TS exports
pnpm -F @bk/design-system storybook      # dev server → http://localhost:6006
pnpm -F @bk/design-system build          # production build
```

## Token build

All design decisions live in `packages/design-system/src/tokens/tokens.json` (DTCG format).
Editing a color, size, or motion value there is the only way to change it across the system.

```bash
pnpm -F @bk/design-system tokens:build
```

Generates:
- `src/styles/variables.css` — CSS custom properties (`--bk-*`)
- `src/tokens/tokens.ts` — typed JS export

## Reference exports

Requires Playwright. Run once to install:

```bash
pnpm -F @bk/design-system export:reference:install
```

Then (with Storybook running):

```bash
pnpm -F @bk/design-system export:reference
```

Outputs to `packages/design-system/exports/`.

## Storybook deployment

The repo is configured for Vercel. Connect at vercel.com → import repo → Vercel will use `vercel.json`.

Target URL: `styleguide-bk.vercel.app` (set in Vercel project settings).

## Handoff package (for Claude Design)

1. Deployed Storybook URL
2. `packages/design-system/src/tokens/tokens.json`
3. `packages/design-system/STYLE_GUIDE.md`
4. `packages/design-system/exports/` folder

Nothing else.

## Tech stack

- **React 18 + TypeScript** (strict mode)
- **Style Dictionary** — token build (custom script, no SD plugins)
- **Radix UI Primitives** — interactive components
- **Lucide React** — icons (1.5px stroke, no filled)
- **Storybook 8 + Vite** — component browser
- **tsup** — package build
- **Biome** — lint + format
- **pnpm workspaces** — monorepo

## Palette — Workshop

| Token | Hex | Name |
|-------|-----|------|
| `color.surface.canvas` | `#EBE7DC` | Drafting paper |
| `color.ink.primary` | `#1F1B16` | Soot |
| `color.signal.primary` | `#3A5A40` | Workshop green |

See `STYLE_GUIDE.md` for the full spec.
