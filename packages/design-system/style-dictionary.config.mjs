/**
 * Token build script — reads src/tokens/tokens.json (DTCG format)
 * and generates:
 *   - src/styles/variables.css  (CSS custom properties)
 *   - src/tokens/tokens.ts      (typed JS export)
 *
 * Run: node style-dictionary.config.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const tokensPath = resolve(__dirname, "src/tokens/tokens.json");
const tokens = JSON.parse(readFileSync(tokensPath, "utf-8"));

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toKebab(str) {
  return str.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
}

function toCamel(parts) {
  return parts
    .join("-")
    .replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

function isSkipped(path, value) {
  if (path[0] === "color" && path[1] === "dark") return true;
  if (value === "TODO") return true;
  return false;
}

// ─── CSS Generation ──────────────────────────────────────────────────────────

const cssLines = [
  "/* AUTO-GENERATED — do not edit. Run `pnpm tokens:build` to regenerate. */",
  "/* Source: src/tokens/tokens.json (DTCG format)                          */",
  "",
  ":root {",
];

function collectCSS(obj, path = [], inheritedType = null) {
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith("$")) continue;
    const currentPath = [...path, key];

    if (val && typeof val === "object" && "$value" in val) {
      const tokenType = val.$type || inheritedType;
      const rawValue = val.$value;

      if (isSkipped(currentPath, rawValue)) continue;

      // Skip types that need special handling (done below)
      if (tokenType === "gradient" || tokenType === "fontFamily" || tokenType === "cubicBezier") {
        continue;
      }

      const varName = `--bk-${currentPath.map(toKebab).join("-")}`;
      const cssValue = Array.isArray(rawValue) ? rawValue.join(", ") : String(rawValue);

      if (val.$description) {
        cssLines.push(`  /* ${val.$description} */`);
      }
      cssLines.push(`  ${varName}: ${cssValue};`);
    } else if (val && typeof val === "object") {
      const nextType = val.$type || inheritedType;
      collectCSS(val, currentPath, nextType);
    }
  }
}

collectCSS(tokens);
cssLines.push("}");

// Special blocks appended after :root
cssLines.push(
  "",
  "/* Gradient — vertical canvas→sunken. Foot of full-page sections ONLY. */",
  "/* No diagonal gradients. No multi-hue gradients. */",
  ":root {",
  "  --bk-gradient-page-foot: linear-gradient(to bottom, #EBE7DC, #DDD8C9);",
  "}",
  "",
  "/* Motion easing */",
  ":root {",
  "  --bk-motion-ease-standard: cubic-bezier(0.2, 0, 0, 1);",
  "  --bk-motion-ease-exit: cubic-bezier(0.4, 0, 1, 1);",
  "}",
  "",
  "/* Font families — self-hosted woff2 via @font-face in /public/fonts/ */",
  "/* Söhne (paid) → General Sans (free fallback, Fontshare)             */",
  "/* Berkeley Mono (paid) → Commit Mono (free fallback)                 */",
  "/* NEVER Inter. NEVER Geist. NEVER Google Fonts CDN.                  */",
  ":root {",
  "  --bk-type-family-sans: 'Söhne', 'General Sans', system-ui, sans-serif;",
  "  --bk-type-family-mono: 'Berkeley Mono', 'Commit Mono', ui-monospace, monospace;",
  "}",
);

// ─── TypeScript Generation ────────────────────────────────────────────────────

const tsEntries = [];

function collectTS(obj, path = [], inheritedType = null) {
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith("$")) continue;
    const currentPath = [...path, key];

    if (val && typeof val === "object" && "$value" in val) {
      if (isSkipped(currentPath, val.$value)) continue;

      const tokenType = val.$type || inheritedType;
      const camelKey = toCamel(currentPath);
      const rawValue = val.$value;

      let tsValue;
      if (tokenType === "fontFamily" && Array.isArray(rawValue)) {
        // Render as CSS font-family string, quoting names with spaces
        const stack = rawValue.map((f) => (f.includes(" ") ? `'${f}'` : f)).join(", ");
        tsValue = `"${stack}"`;
      } else if (tokenType === "cubicBezier" && Array.isArray(rawValue)) {
        tsValue = `"cubic-bezier(${rawValue.join(", ")})"`;
      } else if (tokenType === "gradient") {
        tsValue = `"${rawValue}"`;
      } else if (Array.isArray(rawValue)) {
        tsValue = JSON.stringify(rawValue);
      } else if (typeof rawValue === "string") {
        tsValue = `"${rawValue}"`;
      } else {
        tsValue = String(rawValue);
      }

      tsEntries.push(`  /** ${val.$description || ""} */`);
      tsEntries.push(`  ${camelKey}: ${tsValue},`);
    } else if (val && typeof val === "object") {
      const nextType = val.$type || inheritedType;
      collectTS(val, currentPath, nextType);
    }
  }
}

collectTS(tokens);

const tsLines = [
  "// AUTO-GENERATED — do not edit. Run `pnpm tokens:build` to regenerate.",
  "// Source: src/tokens/tokens.json (DTCG format)",
  "",
  "export const tokens = {",
  ...tsEntries,
  "} as const;",
  "",
  "export type TokenKey = keyof typeof tokens;",
  "",
  "/** CSS custom property name for a given token key (for tokens that map to CSS vars) */",
  "export function cssVar(key: TokenKey): string {",
  "  const kebab = key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);",
  "  return `--bk-${kebab}`;",
  "}",
];

// ─── Write output ─────────────────────────────────────────────────────────────

mkdirSync(resolve(__dirname, "src/styles"), { recursive: true });
writeFileSync(resolve(__dirname, "src/styles/variables.css"), cssLines.join("\n") + "\n");

writeFileSync(resolve(__dirname, "src/tokens/tokens.ts"), tsLines.join("\n") + "\n");

console.log("✓  src/styles/variables.css");
console.log("✓  src/tokens/tokens.ts");
console.log("Token build complete.");
