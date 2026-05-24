// AUTO-GENERATED — do not edit. Run `pnpm tokens:build` to regenerate.
// Source: src/tokens/tokens.json (DTCG format)

export const tokens = {
  /** Page background. Drafting paper. Warm, slightly gray, never cream. */
  colorSurfaceCanvas: "#EBE7DC",
  /** Cards, panels, raised surfaces. Vellum. */
  colorSurfaceRaised: "#F4F1E8",
  /** Inset areas, code blocks, quiet zones. Linen. */
  colorSurfaceSunken: "#DDD8C9",
  /** Primary text. Soot — warm brown-black, not charcoal, not pure black. */
  colorInkPrimary: "#1F1B16",
  /** Secondary text, metadata. Driftwood. */
  colorInkSecondary: "#5C5448",
  /** Tertiary, placeholders, captions. Stone. */
  colorInkMuted: "#8A8073",
  /** Hairlines, dividers, card borders. Twine. */
  colorBorderDefault: "#C7C0AE",
  /** Emphasized borders, focused inputs. */
  colorBorderStrong: "#9A8F78",
  /** Primary action, links, brand mark. Workshop green. Single accent — use sparingly. */
  colorSignalPrimary: "#3A5A40",
  /** Hover state for primary. */
  colorSignalPrimaryHover: "#2F4A35",
  /** Tinted background for primary-themed surfaces. */
  colorSignalPrimarySubtle: "#E2E6D9",
  /** Inline text highlighter (<mark>). Lichen. Use sparingly for editorial emphasis. */
  colorHighlightMark: "#C8CC8A",
  /** Reuses signal primary. No separate green needed. */
  colorStatusSuccess: "#3A5A40",
  /** Earth-toned warning, not amber, not yellow. */
  colorStatusWarning: "#8B6B2E",
  /** Earth-toned error, not red-red, not terracotta-bright. */
  colorStatusDanger: "#7A3B2E",
  /** Vertical fade canvas→sunken. Used only at the foot of full-page sections to suggest depth. No diagonal gradients. No multi-hue gradients. */
  gradientPageFoot: "linear-gradient(to bottom, #EBE7DC, #DDD8C9)",
  /** No space. */
  space0: "0px",
  /** Micro spacing. */
  space1: "4px",
  /** Compact spacing. */
  space2: "8px",
  /** Tight spacing. */
  space3: "12px",
  /** Base spacing unit. */
  space4: "16px",
  /** Comfortable spacing. */
  space5: "24px",
  /** Generous spacing. */
  space6: "32px",
  /** Section rhythm — default vertical gap between content blocks. */
  space7: "48px",
  /** Large section gap. */
  space8: "64px",
  /** Extra-large section gap. */
  space9: "96px",
  /** Maximum section gap. */
  space10: "128px",
  /** No rounding. */
  radiusNone: "0px",
  /** Subtle rounding. */
  radiusSm: "4px",
  /** Default component rounding. */
  radiusMd: "8px",
  /** Maximum surface rounding. No values larger than this on surfaces. */
  radiusLg: "12px",
  /** Used only on tags/badges. Never on cards or surfaces. */
  radiusPill: "999px",
  /** No shadow. Default for cards — borders do the work. */
  shadowNone: "none",
  /** Subtle elevation. */
  shadowSm: "0 1px 2px rgba(31, 27, 22, 0.06)",
  /** Moderate elevation. No shadow.lg — no glow effects, no colored shadows. */
  shadowMd: "0 2px 8px rgba(31, 27, 22, 0.08)",
  /** Quick interactions, hover color changes. */
  motionDurationFast: "120ms",
  /** Default transitions. */
  motionDurationBase: "200ms",
  /** Complex transitions, overlays. */
  motionDurationSlow: "320ms",
  /** Standard easing. No bouncy springs. */
  motionEaseStandard: "cubic-bezier(0.2, 0, 0, 1)",
  /** Exit easing for elements leaving the screen. */
  motionEaseExit: "cubic-bezier(0.4, 0, 1, 1)",
  /** Page hero only. */
  typeSizeDisplayXl: "clamp(3.5rem, 5vw, 5rem)",
  /** Section openers. */
  typeSizeDisplayLg: "3.5rem",
  /** H1 inside content. */
  typeSizeHeadingXl: "2.25rem",
  /** H2. */
  typeSizeHeadingLg: "1.75rem",
  /** H3. */
  typeSizeHeadingMd: "1.375rem",
  /** H4 / card titles. */
  typeSizeHeadingSm: "1.125rem",
  /** Lede paragraphs. */
  typeSizeBodyLg: "1.125rem",
  /** Default body. */
  typeSizeBodyMd: "1rem",
  /** Secondary text. */
  typeSizeBodySm: "0.875rem",
  /** Code, technical labels, eyebrow metadata. */
  typeSizeMonoMd: "0.9375rem",
  /** Tags, badges, captions. */
  typeSizeMonoSm: "0.8125rem",
  /** Line height for display-xl. */
  typeLeadingDisplayXl: 1.02,
  /** Line height for display-lg. */
  typeLeadingDisplayLg: 1.05,
  /** Line height for heading-xl. */
  typeLeadingHeadingXl: 1.15,
  /** Line height for heading-lg. */
  typeLeadingHeadingLg: 1.2,
  /** Line height for heading-md. */
  typeLeadingHeadingMd: 1.3,
  /** Line height for heading-sm. */
  typeLeadingHeadingSm: 1.35,
  /** Line height for body-lg. */
  typeLeadingBodyLg: 1.55,
  /** Line height for body-md. */
  typeLeadingBodyMd: 1.55,
  /** Line height for body-sm. */
  typeLeadingBodySm: 1.5,
  /** Line height for mono-md. */
  typeLeadingMonoMd: 1.5,
  /** Line height for mono-sm. */
  typeLeadingMonoSm: 1.45,
  /** Default body weight. */
  typeWeightRegular: 400,
  /** Display, heading, and emphasis weight. Never 700+ in this system. */
  typeWeightMedium: 500,
  /** Letter-spacing for display sizes. */
  typeTrackingDisplay: "-0.01em",
  /** Letter-spacing for body text. */
  typeTrackingBody: "0em",
  /** Letter-spacing for uppercase mono labels (tags, badges, eyebrows). */
  typeTrackingMonoLabel: "0.04em",
  /** Primary sans-serif. Söhne (paid) preferred; General Sans (Fontshare, free) as fallback. Never Inter, never Geist. */
  typeFamilySans: "Söhne, 'General Sans', system-ui, sans-serif",
  /** Accent mono. Berkeley Mono (paid) preferred; Commit Mono (free) as fallback. Never JetBrains Mono. */
  typeFamilyMono: "'Berkeley Mono', 'Commit Mono', ui-monospace, monospace",
  /** Maximum width for prose/reading content. */
  layoutProseMax: "72ch",
  /** Maximum width for page compositions. */
  layoutCompositionMax: "1120px",
} as const;

export type TokenKey = keyof typeof tokens;

/** CSS custom property name for a given token key (for tokens that map to CSS vars) */
export function cssVar(key: TokenKey): string {
  const kebab = key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
  return `--bk-${kebab}`;
}
