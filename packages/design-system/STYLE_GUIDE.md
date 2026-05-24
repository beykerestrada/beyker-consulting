# Beyker Consulting — Design System Style Guide

**Version:** 1.0 · **Reading time:** ~10 minutes

---

## 1. Brand POV

Beyker Estrada Consulting is a solo Notion architect, operator's consultant, and automation strategist working in EN/ES. The voice is **operator-to-operator** — direct, opinionated, technically credible, slightly human. Not corporate SaaS. Not influencer. Not a marketing agency.

Visually that translates to **"workshop"** rather than "studio" or "startup": a working surface, real materials, evidence of thought. The closest reference points are the *feel* of Notion and Basecamp's writing surfaces, but the execution must not mimic them. The system is named Workshop. The canvas color is drafting paper. The accent is a muted forest green — a color you'd see on a technical diagram, not a startup landing page.

---

## 2. The Hard NOs

These are the AI-default design tells this system explicitly kills. Any PR that introduces any of the following is rejected.

1. **No AI purple, violet, or deep indigo.** No `#0F0F2D`, no `#6366F1`, no synthwave palette.
2. **No purple-to-pink or blue-to-purple gradients.** Gradients are `gradient.page.foot` only — one vertical, single-hue, low-contrast.
3. **No `#3B82F6` electric blue or `#E61363` hot pink.** No Lovable/Vercel default accents.
4. **No generic AI off-whites** (`#FCFBF8`, `#F4F3EE`, `#F7F4ED`). Canvas is `#EBE7DC` — use it exactly.
5. **No Inter, no Geist.** Typography is Söhne/General Sans + Berkeley Mono/Commit Mono. Never Google Fonts CDN.
6. **No glassmorphism** except the sticky `<TopNav>` on scroll (opacity ≥ 0.85). One location. That's it.
7. **No pure black `#000000` or violet-black.** Dark theme is `TODO` and will be warm-neutral, never violet-tinted.
8. **No cookie-cutter SaaS hero layout.** No: centered headline + three-column feature grid + pricing table.
9. **No ink/terracotta/amber/charcoal as dominant palette.** Those are the operator-warm clichés.
10. **No emoji as decorative bullets** in production components. Emoji in copy only.

---

## 3. Palette — Workshop

All colors live in `src/tokens/tokens.json` (DTCG format). CSS variables are generated via `pnpm tokens:build`.

### Surfaces

| Token | Hex | Name | Rationale |
|-------|-----|------|-----------|
| `color.surface.canvas` | `#EBE7DC` | Drafting paper | Page background. Warm but not cream. Not an AI off-white. |
| `color.surface.raised` | `#F4F1E8` | Vellum | Cards, panels. Lighter than canvas by one step. |
| `color.surface.sunken` | `#DDD8C9` | Linen | Code blocks, inset areas. Darker than canvas by one step. |

### Ink

| Token | Hex | Name | Rationale |
|-------|-----|------|-----------|
| `color.ink.primary` | `#1F1B16` | Soot | Warm brown-black. Never pure black. Sets the document tone. |
| `color.ink.secondary` | `#5C5448` | Driftwood | Supporting text, metadata labels. |
| `color.ink.muted` | `#8A8073` | Stone | Placeholders, captions, tertiary information. |

### Borders

| Token | Hex | Name | Rationale |
|-------|-----|------|-----------|
| `color.border.default` | `#C7C0AE` | Twine | Hairlines. Visible but not assertive. |
| `color.border.strong` | `#9A8F78` | — | Focused inputs, emphasized edges. |

### Signal (the one accent)

| Token | Hex | Name | Rationale |
|-------|-----|------|-----------|
| `color.signal.primary` | `#3A5A40` | Workshop green | Forest-adjacent. Technical-authority green. Not startup green. |
| `color.signal.primary.hover` | `#2F4A35` | — | One step darker on hover. |
| `color.signal.primary.subtle` | `#E2E6D9` | — | Tinted backgrounds for signal-themed surfaces. |

### Highlight & Status

| Token | Hex | Rationale |
|-------|-----|-----------|
| `color.highlight.mark` | `#C8CC8A` | Lichen. Editorial emphasis only — `<mark>` element. |
| `color.status.success` | `#3A5A40` | Reuses signal. No separate green needed. |
| `color.status.warning` | `#8B6B2E` | Earth-toned. Not amber, not yellow. |
| `color.status.danger` | `#7A3B2E` | Earth-toned. Not red-red. |

### Gradient

One gradient: `gradient.page.foot` = `linear-gradient(to bottom, #EBE7DC, #DDD8C9)`.
Used only at the foot of full-page sections. No diagonal. No multi-hue.

### Dark mode

Scaffolded but not implemented in v1. Values are `TODO` in `tokens.json`.
The dark palette will be: tea-stained paper inverted to a dim workshop. **Never violet-black.**

---

## 4. Typography

### Font pairing

| Role | Preferred (paid) | Fallback (free) | Never |
|------|-----------------|-----------------|-------|
| Sans (primary) | **Söhne** — Klim Type Foundry | **General Sans** — Fontshare | Inter, Geist |
| Mono (accent) | **Berkeley Mono** — U.S. Graphics | **Commit Mono** | JetBrains Mono |

Self-hosted as `woff2` from `/public/fonts/`. `@font-face` declarations in `src/styles/base.css`.

### Type scale

| Token | Size | Line-height | Use |
|-------|------|-------------|-----|
| `type.size.display-xl` | clamp(3.5–5rem) | 1.02 | Page hero only |
| `type.size.display-lg` | 3.5rem | 1.05 | Section openers |
| `type.size.heading-xl` | 2.25rem | 1.15 | H1 inside content |
| `type.size.heading-lg` | 1.75rem | 1.20 | H2 |
| `type.size.heading-md` | 1.375rem | 1.30 | H3 |
| `type.size.heading-sm` | 1.125rem | 1.35 | H4 / card titles |
| `type.size.body-lg` | 1.125rem | 1.55 | Lede paragraphs |
| `type.size.body-md` | 1rem | 1.55 | Default body |
| `type.size.body-sm` | 0.875rem | 1.50 | Secondary text |
| `type.size.mono-md` | 0.9375rem | 1.50 | Code, technical labels, eyebrows |
| `type.size.mono-sm` | 0.8125rem | 1.45 | Tags, badges, captions |

### Sample sentences

**EN (body-md):** "Most operators don't have a Notion problem. They have a workflow problem — Notion is just where it shows up."

**ES (body-md):** "La mayoría de los sistemas de Notion que veo no están rotos. Están incompletos. Hay una diferencia."

**EN (display-lg):** "Build systems that hold."

**ES (display-lg):** "Sistemas que duran."

### Rules

- Display & heading: **weight 500**. Never 700+.
- Body: **weight 400**, 500 for emphasis. Italic is *meaningful* — terms of art, ship names. Never for punchlines.
- Mono: **weight 400 only**. For labeling and technical artifacts. Never decorative running text.
- Letter-spacing: `-0.01em` on display, `0` on body, `+0.04em` on uppercase mono labels.
- Default text color: `color.ink.primary` (`#1F1B16`). Never `#000`.

---

## 5. Spacing, Radii, Shadows, Motion

### Spacing (4-based)

`space.1` = 4px → `space.10` = 128px. Default vertical rhythm between blocks: **`space.7` = 48px**.

### Radii

| Token | Value | Rule |
|-------|-------|------|
| `radius.none` | 0px | Sharp |
| `radius.sm` | 4px | Inputs, small elements |
| `radius.md` | 8px | Buttons, cards (default) |
| `radius.lg` | 12px | Maximum — never larger on surfaces |
| `radius.pill` | 999px | **Tags and badges only** |

The look is paper, not balloons.

### Shadows

Three tokens only: `shadow.none` (default for cards), `shadow.sm`, `shadow.md`.
No `shadow.lg`. No glow effects. No colored shadows. Borders do the work.

### Motion

| Token | Value | Use |
|-------|-------|-----|
| `motion.duration.fast` | 120ms | Hover color/border changes |
| `motion.duration.base` | 200ms | Default transitions |
| `motion.duration.slow` | 320ms | Overlays, complex transitions |
| `motion.ease.standard` | `cubic-bezier(0.2, 0, 0, 1)` | Enter |
| `motion.ease.exit` | `cubic-bezier(0.4, 0, 1, 1)` | Exit |

No bouncy springs. No `transform: scale(1.05)` on hover. Hover states change color/border, not size.

---

## 6. Component Inventory

### Primitives
| Component | Intent |
|-----------|--------|
| `Box` | Generic container with token-bound spacing and radius props. |
| `Stack` | Vertical or horizontal flex layout with token gap. |
| `Inline` | Horizontal inline flow with wrap support. |
| `Grid` / `GridItem` | 12-column CSS grid with token gap and span props. |
| `Text` | Polymorphic text with `variant` prop mapping to type tokens. |
| `Icon` | Lucide icons at 1.5px stroke, sized via tokens. No filled icons. |

### Surfaces
| Component | Intent |
|-----------|--------|
| `Card` | Solid surface, hairline border. Variants: default, raised, sunken. |
| `Section` | Full-bleed page section with internal max-width container. |
| `Divider` | Hairline rule. Variants: full, indented, labeled (mono label). |

### Controls
| Component | Intent |
|-----------|--------|
| `Button` | Variants: primary (green), secondary (ink outline), ghost, link. |
| `Input` | Border-focused text input with label, hint, error states. |
| `Textarea` | Resizable multi-line input. |
| `Select` | Radix-based select with group support. |
| `Checkbox` | Radix-based checkbox with label and hint. |
| `RadioGroup` | Radix-based radio group with descriptions per option. |
| `Switch` | Radix-based toggle switch. |
| `Tag` | Pill-radius mono uppercase label for taxonomy (e.g. "NOTION"). |
| `Badge` | Square-radius mono uppercase label for status (e.g. "SHIPPED"). |

### Navigation & Feedback
| Component | Intent |
|-----------|--------|
| `TopNav` | Sticky header. Glassmorphism on scroll (≥0.85 opacity) — only place. |
| `Footer` | Multi-column, document-style, mono column labels. |
| `Toast` | Radix toast, solid surface, auto-dismiss. |
| `Tooltip` | Radix tooltip, solid ink surface, mono text. |

### Editorial
| Component | Intent |
|-----------|--------|
| `Eyebrow` | Uppercase mono label above headings. Max 3 words. Never emoji. |
| `Lede` | Opening paragraph. body-lg, max 65ch. |
| `Pullquote` | Large quote with left signal-primary rule. Left-aligned, never centered. |
| `Aside` | Marginalia note with mono label (e.g. "Note", "Constraint"). |
| `Manifesto` | Full-width declarative statement. display-lg, asymmetric padding. |
| `WorkLog` | Timestamped entry list for case-study writeups. |
| `Specsheet` | Definition-list as technical spec sheet (`<dl>`). Replaces feature grids. |

### Not in v1
Pricing tables, testimonial carousels, hero-with-video-background, animated stat counters,
three-column "how it works" grids. Use `Specsheet`, `Manifesto`, `WorkLog`, or custom `Grid` compositions.

---

## 7. Layout Principles

**Document over dashboard.** The site reads like a working document, not an app UI.
Left-aligned content, generous gutters.

- Prose max-width: **72ch** (`--bk-layout-prose-max`)
- Composition max-width: **1120px** (`--bk-layout-composition-max`)
- Default section rhythm: **48px** (`--bk-space-7`)

**Asymmetry is allowed.** A 5/12–7/12 split is preferred over 6/6. Avoid perfect symmetry by default.

**Mono as wayfinding.** Section numbers, timestamps, tags, file paths, version labels → mono.
This is the technical-authority signal.

**Borders, not boxes.** Group related content with hairlines and whitespace, not nested cards on cards.

**One accent, used rarely.** Workshop green appears on: logo, primary buttons, active nav, link underlines,
pullquote rule, WorkLog labels. If a page has more than ~6 green elements visible at once, something is wrong.

---

## 8. Voice Notes

**Register:** Operator-to-operator. Direct, opinionated, technically credible, slightly human.
Bilingual EN/ES — not "translated marketing" but the same directness in a different language.

**The pattern to kill:** "Short sentence. Short sentence. Short sentence." — the most obvious AI-generated
writing tell. It reads like bullet points pretending to be prose. Don't do it.

**Instead write sentences with real logic in them:** "Most operators don't have a Notion problem.
They have a workflow problem that Notion can solve — once the architecture is right."

**Eyebrow copy rules:** Max 3 words, uppercase. Never rhetorical. Never with emoji.
✓ `CLIENT WORK` ✓ `01 — DIAGNOSE` ✗ `✨ ABOUT US` ✗ `🔎 EXPLORE`

---

## 9. Self-Audit — Hard NOs Checklist

Audited against the Hard NOs in §2 and §3 of the original brief.

- [x] **No AI purple / violet / indigo.** Palette contains zero purple-adjacent colors. Workshop green (`#3A5A40`) is the sole signal — a muted forest green with no violet undertone. ✓
- [x] **No purple-to-pink or blue-to-purple gradients.** One gradient exists: `gradient.page.foot`, a vertical canvas→sunken fade. Single hue, low contrast, only at page bottoms. ✓
- [x] **No `#3B82F6` electric blue or `#E61363` hot pink.** Neither color appears in any token, component, or style file. ✓
- [x] **No generic AI off-whites.** Canvas is `#EBE7DC` — verified unique, not on the banned list. ✓
- [x] **No Inter or Geist.** Font stack is Söhne → General Sans → system-ui. Mono is Berkeley Mono → Commit Mono. CDN imports: none. ✓
- [x] **No glassmorphism except TopNav on scroll.** `backdrop-filter` appears in exactly one place in `components.css`: `.bk-topnav--scrolled`, with `background-color: rgba(235, 231, 220, 0.88)` (opacity 0.88 ≥ 0.85). ✓
- [x] **No pure black `#000000`.** Primary ink is `#1F1B16`. Search across all CSS and component files: zero instances of `#000` or `#000000`. ✓
- [x] **No cookie-cutter SaaS hero layout.** No hero component exists in v1. Editorial components (`Manifesto`, `Specsheet`, `WorkLog`, `Pullquote`) are the composition primitives. ✓
- [x] **No ink/terracotta/amber/charcoal as dominant palette.** Palette is Workshop (drafting paper surfaces, soot ink, forest green accent). No terracotta, no amber, no standalone charcoal. ✓
- [x] **No emoji as decorative bullets.** No emoji in component CSS, component TSX, or Storybook stories. `Icon` component uses Lucide icons at 1.5px stroke only. ✓

All 10 Hard NOs: **CLEAR**.
