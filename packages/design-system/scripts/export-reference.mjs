/**
 * Reference export script — `pnpm export:reference`
 *
 * Uses Playwright to screenshot:
 *   1. Each Storybook story's Default view at 1440px wide
 *   2. tokens-overview.png  (palette + type scale + spacing)
 *   3. components-overview.png (montage of every component)
 *
 * Output: packages/design-system/exports/
 *
 * Prerequisites:
 *   pnpm add -D playwright @playwright/browser-chromium
 *   npx playwright install chromium
 */

import { chromium } from "playwright";
import { createWriteStream, mkdirSync, readdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");
const exportsDir = resolve(rootDir, "exports");
const STORYBOOK_URL = process.env.STORYBOOK_URL || "http://localhost:6006";
const VIEWPORT_WIDTH = 1440;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ensureExportsDir() {
  mkdirSync(exportsDir, { recursive: true });
}

async function waitForStorybook(page, maxMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    try {
      const res = await page.goto(`${STORYBOOK_URL}/index.json`, { timeout: 5000 });
      if (res && res.ok()) return;
    } catch (_) {}
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`Storybook not reachable at ${STORYBOOK_URL} after ${maxMs}ms`);
}

function storyUrl(storyId) {
  return `${STORYBOOK_URL}/iframe.html?id=${storyId}&viewMode=story`;
}

// ─── Story index ───────────────────────────────────────────────────────────────

const STORY_GROUPS = {
  // Primitives
  "primitives-layout--box-default": "Primitives — Box",
  "primitives-layout--stack-default": "Primitives — Stack",
  "primitives-layout--inline-default": "Primitives — Inline",
  "primitives-layout--grid-default": "Primitives — Grid",
  "primitives-layout--text-variants": "Primitives — Text",

  // Surfaces
  "surfaces-card--default": "Surfaces — Card",
  "surfaces-card--variants": "Surfaces — Card Variants",
  "navigation--divider-variants": "Navigation — Divider",

  // Controls
  "controls-button--default": "Controls — Button",
  "controls-button--variants": "Controls — Button Variants",
  "controls-button--sizes": "Controls — Button Sizes",
  "controls-form-fields--input-default": "Controls — Input",
  "controls-form-fields--input-states": "Controls — Input States",
  "controls-form-fields--textarea-default": "Controls — Textarea",
  "controls-form-fields--checkbox-default": "Controls — Checkbox",
  "controls-form-fields--radio-default": "Controls — Radio",
  "controls-form-fields--switch-default": "Controls — Switch",
  "controls-form-fields--tags-and-badges": "Controls — Tags & Badges",

  // Navigation
  "navigation--top-nav-default": "Navigation — TopNav",
  "navigation--footer-default": "Navigation — Footer",

  // Editorial
  "editorial-eyebrow--eyebrow-default": "Editorial — Eyebrow",
  "editorial-eyebrow--eyebrow-variants": "Editorial — Eyebrow Variants",
  "editorial-eyebrow--lede-default": "Editorial — Lede",
  "editorial-eyebrow--pullquote-default": "Editorial — Pullquote",
  "editorial-eyebrow--aside-default": "Editorial — Aside",
  "editorial-eyebrow--manifesto-default": "Editorial — Manifesto",
  "editorial-eyebrow--work-log-default": "Editorial — WorkLog",
  "editorial-eyebrow--specsheet-default": "Editorial — Specsheet",
  "editorial-eyebrow--full-composition": "Editorial — Full Composition",
};

// ─── Token overview page ───────────────────────────────────────────────────────

const TOKENS_OVERVIEW_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Tokens Overview — Workshop</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #EBE7DC;
    color: #1F1B16;
    font-family: 'General Sans', system-ui, sans-serif;
    padding: 48px;
  }
  h2 {
    font-family: 'Commit Mono', ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #8A8073;
    margin-bottom: 16px;
    margin-top: 40px;
    border-top: 1px solid #C7C0AE;
    padding-top: 16px;
  }
  h2:first-child { margin-top: 0; border-top: none; padding-top: 0; }
  .swatches { display: flex; flex-wrap: wrap; gap: 12px; }
  .swatch { width: 120px; }
  .swatch-color { height: 56px; border-radius: 4px; border: 1px solid rgba(31,27,22,0.08); margin-bottom: 6px; }
  .swatch-name { font-family: 'Commit Mono', ui-monospace, monospace; font-size: 10px; color: #5C5448; }
  .swatch-hex { font-family: 'Commit Mono', ui-monospace, monospace; font-size: 10px; color: #8A8073; }

  .type-row { display: flex; align-items: baseline; gap: 16px; margin-bottom: 16px; border-bottom: 1px solid #C7C0AE; padding-bottom: 16px; }
  .type-label { font-family: 'Commit Mono', ui-monospace, monospace; font-size: 10px; color: #8A8073; width: 140px; flex-shrink: 0; }

  .space-row { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
  .space-bar { background: #3A5A40; height: 16px; border-radius: 2px; }
  .space-meta { font-family: 'Commit Mono', ui-monospace, monospace; font-size: 10px; color: #8A8073; }
</style>
</head>
<body>

<h2>Color — Workshop Palette</h2>
<div class="swatches">
  <div class="swatch"><div class="swatch-color" style="background:#EBE7DC;"></div><div class="swatch-name">surface.canvas</div><div class="swatch-hex">#EBE7DC</div></div>
  <div class="swatch"><div class="swatch-color" style="background:#F4F1E8;"></div><div class="swatch-name">surface.raised</div><div class="swatch-hex">#F4F1E8</div></div>
  <div class="swatch"><div class="swatch-color" style="background:#DDD8C9;"></div><div class="swatch-name">surface.sunken</div><div class="swatch-hex">#DDD8C9</div></div>
  <div class="swatch"><div class="swatch-color" style="background:#1F1B16;"></div><div class="swatch-name">ink.primary</div><div class="swatch-hex">#1F1B16</div></div>
  <div class="swatch"><div class="swatch-color" style="background:#5C5448;"></div><div class="swatch-name">ink.secondary</div><div class="swatch-hex">#5C5448</div></div>
  <div class="swatch"><div class="swatch-color" style="background:#8A8073;"></div><div class="swatch-name">ink.muted</div><div class="swatch-hex">#8A8073</div></div>
  <div class="swatch"><div class="swatch-color" style="background:#C7C0AE;"></div><div class="swatch-name">border.default</div><div class="swatch-hex">#C7C0AE</div></div>
  <div class="swatch"><div class="swatch-color" style="background:#9A8F78;"></div><div class="swatch-name">border.strong</div><div class="swatch-hex">#9A8F78</div></div>
  <div class="swatch"><div class="swatch-color" style="background:#3A5A40;"></div><div class="swatch-name">signal.primary</div><div class="swatch-hex">#3A5A40</div></div>
  <div class="swatch"><div class="swatch-color" style="background:#2F4A35;"></div><div class="swatch-name">signal.hover</div><div class="swatch-hex">#2F4A35</div></div>
  <div class="swatch"><div class="swatch-color" style="background:#E2E6D9;"></div><div class="swatch-name">signal.subtle</div><div class="swatch-hex">#E2E6D9</div></div>
  <div class="swatch"><div class="swatch-color" style="background:#C8CC8A;"></div><div class="swatch-name">highlight.mark</div><div class="swatch-hex">#C8CC8A</div></div>
  <div class="swatch"><div class="swatch-color" style="background:#8B6B2E;"></div><div class="swatch-name">status.warning</div><div class="swatch-hex">#8B6B2E</div></div>
  <div class="swatch"><div class="swatch-color" style="background:#7A3B2E;"></div><div class="swatch-name">status.danger</div><div class="swatch-hex">#7A3B2E</div></div>
</div>

<h2>Type Scale</h2>
<div>
  <div class="type-row"><div class="type-label">display.xl · 5rem</div><span style="font-size:clamp(3.5rem,5vw,5rem);font-weight:500;letter-spacing:-0.01em;line-height:1.02">Workshop</span></div>
  <div class="type-row"><div class="type-label">display.lg · 3.5rem</div><span style="font-size:3.5rem;font-weight:500;letter-spacing:-0.01em;line-height:1.05">Build systems that hold.</span></div>
  <div class="type-row"><div class="type-label">heading.xl · 2.25rem</div><span style="font-size:2.25rem;font-weight:500;line-height:1.15">Notion Architecture</span></div>
  <div class="type-row"><div class="type-label">heading.lg · 1.75rem</div><span style="font-size:1.75rem;font-weight:500;line-height:1.2">Setup Sessions</span></div>
  <div class="type-row"><div class="type-label">heading.md · 1.375rem</div><span style="font-size:1.375rem;font-weight:500;line-height:1.3">What operators actually need</span></div>
  <div class="type-row"><div class="type-label">heading.sm · 1.125rem</div><span style="font-size:1.125rem;font-weight:500;line-height:1.35">Phase 1: Diagnose</span></div>
  <div class="type-row"><div class="type-label">body.lg · 1.125rem</div><span style="font-size:1.125rem;line-height:1.55;color:#1F1B16">Most operators don't have a Notion problem.</span></div>
  <div class="type-row"><div class="type-label">body.md · 1rem</div><span style="font-size:1rem;line-height:1.55">Default body text — 72ch max width for prose.</span></div>
  <div class="type-row"><div class="type-label">body.sm · 0.875rem</div><span style="font-size:0.875rem;line-height:1.5;color:#5C5448">Secondary information, metadata, hints.</span></div>
  <div class="type-row"><div class="type-label">mono.md · 0.9375rem</div><span style="font-family:'Commit Mono',ui-monospace,monospace;font-size:0.9375rem;line-height:1.5">notion-architecture/v2.1.0</span></div>
  <div class="type-row"><div class="type-label">mono.sm · 0.8125rem</div><span style="font-family:'Commit Mono',ui-monospace,monospace;font-size:0.8125rem;line-height:1.45;letter-spacing:0.04em;text-transform:uppercase;color:#8A8073">NOTION · AUTOMATION · STRATEGY</span></div>
</div>

<h2>Spacing Scale (4-based)</h2>
<div>
  ${[4,8,12,16,24,32,48,64,96,128].map((px, i) => `
  <div class="space-row">
    <div class="space-meta" style="width:100px">space.${i+1} · ${px}px</div>
    <div class="space-bar" style="width:${px}px;min-width:2px"></div>
  </div>`).join("")}
</div>

<h2>Radii</h2>
<div style="display:flex;gap:16px;align-items:flex-end">
  ${[["none","0px","40px"],["sm","4px","40px"],["md","8px","40px"],["lg","12px","40px"],["pill","999px","40px"]].map(([name,val,size]) => `
  <div style="text-align:center">
    <div style="width:${size};height:${size};border-radius:${val};background:#DDD8C9;border:1px solid #C7C0AE;margin-bottom:6px"></div>
    <div style="font-family:'Commit Mono',ui-monospace,monospace;font-size:10px;color:#8A8073">${name}</div>
    <div style="font-family:'Commit Mono',ui-monospace,monospace;font-size:10px;color:#8A8073">${val}</div>
  </div>`).join("")}
</div>

</body>
</html>
`;

// ─── Main ──────────────────────────────────────────────────────────────────────

async function run() {
  ensureExportsDir();
  console.log("Starting Playwright export...");

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: VIEWPORT_WIDTH, height: 900 },
  });

  // ── 1. tokens-overview.png ──────────────────────────────────────────────────
  console.log("  → tokens-overview.png");
  {
    const page = await context.newPage();
    await page.setContent(TOKENS_OVERVIEW_HTML, { waitUntil: "networkidle" });
    await page.screenshot({
      path: resolve(exportsDir, "tokens-overview.png"),
      fullPage: true,
    });
    await page.close();
  }

  // ── 2. Individual story screenshots ────────────────────────────────────────
  const storiesPage = await context.newPage();

  // Check Storybook is up
  try {
    await waitForStorybook(storiesPage);
    console.log("  → Storybook reachable, capturing stories...");
  } catch (err) {
    console.error(`  ✗ ${err.message}`);
    console.error("  Make sure Storybook is running: pnpm storybook");
    await browser.close();
    process.exit(1);
  }

  const screenshotPaths = [];

  for (const [storyId, label] of Object.entries(STORY_GROUPS)) {
    const url = storyUrl(storyId);
    try {
      await storiesPage.goto(url, { waitUntil: "networkidle", timeout: 15000 });
      // Wait for fonts to load
      await storiesPage.waitForTimeout(500);

      const safeName = storyId.replace(/[^a-z0-9-]/g, "-");
      const outputPath = resolve(exportsDir, `story-${safeName}.png`);

      await storiesPage.screenshot({ path: outputPath, fullPage: true });
      screenshotPaths.push(outputPath);
      console.log(`  → ${label}`);
    } catch (err) {
      console.warn(`  ⚠ Skipped "${label}": ${err.message}`);
    }
  }

  await storiesPage.close();

  // ── 3. components-overview.png — montage via CSS grid ──────────────────────
  if (screenshotPaths.length > 0) {
    console.log("  → components-overview.png (montage)");
    // Build a simple HTML page that loads all screenshots as <img> in a grid
    // We save paths as data URIs for self-contained rendering
    const { readFileSync } = await import("fs");
    const items = screenshotPaths.map((p) => {
      const data = readFileSync(p);
      const b64 = data.toString("base64");
      const label = p.split("/").pop()?.replace(/^story-/, "").replace(/-default\.png$/, "").replace(/-/g, " ") ?? "";
      return { b64, label };
    });

    const montageHTML = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
  body { background:#EBE7DC; padding:32px; font-family:'General Sans',system-ui,sans-serif; }
  h1 { font-family:'Commit Mono',ui-monospace,monospace; font-size:13px; letter-spacing:0.04em; text-transform:uppercase; color:#8A8073; margin-bottom:24px; }
  .grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
  .item { border:1px solid #C7C0AE; border-radius:8px; overflow:hidden; background:#F4F1E8; }
  .item img { width:100%; display:block; }
  .item p { font-family:'Commit Mono',ui-monospace,monospace; font-size:10px; letter-spacing:0.04em; text-transform:uppercase; color:#8A8073; padding:8px; border-top:1px solid #C7C0AE; }
</style>
</head><body>
<h1>Workshop Design System — Component Reference</h1>
<div class="grid">
${items.map(({ b64, label }) => `  <div class="item"><img src="data:image/png;base64,${b64}" /><p>${label}</p></div>`).join("\n")}
</div>
</body></html>`;

    const overviewPage = await context.newPage();
    await overviewPage.setContent(montageHTML, { waitUntil: "networkidle" });
    await overviewPage.screenshot({
      path: resolve(exportsDir, "components-overview.png"),
      fullPage: true,
    });
    await overviewPage.close();
  }

  await browser.close();

  console.log(`\n✓ Export complete → ${exportsDir}/`);
  console.log("  tokens-overview.png");
  console.log("  components-overview.png");
  console.log(`  ${screenshotPaths.length} story screenshots`);
}

run().catch((err) => {
  console.error("Export failed:", err);
  process.exit(1);
});
