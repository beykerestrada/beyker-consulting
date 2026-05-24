import type { Meta, StoryObj } from "@storybook/react";
import { Aside } from "../src/components/Aside/Aside";
import { Divider } from "../src/components/Divider/Divider";
import { Eyebrow } from "../src/components/Eyebrow/Eyebrow";
import { Lede } from "../src/components/Lede/Lede";
import { Manifesto } from "../src/components/Manifesto/Manifesto";
import { Pullquote } from "../src/components/Pullquote/Pullquote";
import { Specsheet } from "../src/components/Specsheet/Specsheet";
import { WorkLog } from "../src/components/WorkLog/WorkLog";
import { Stack } from "../src/primitives/Stack";
import { Text } from "../src/primitives/Text";

// ─── Eyebrow ─────────────────────────────────────────────────

export const EyebrowDefault: StoryObj = {
  name: "Default",
  render: () => (
    <Stack gap="2">
      <Eyebrow>Client Work</Eyebrow>
      <Text variant="heading-lg">Notion Architecture for a 40-person ops team.</Text>
    </Stack>
  ),
};

export const EyebrowVariants: StoryObj = {
  name: "Variants",
  render: () => (
    <Stack gap="5">
      <div>
        <Eyebrow>Case Study</Eyebrow>
        <Text variant="heading-md">What we rebuilt and why it worked.</Text>
      </div>
      <div>
        <Eyebrow>Automation</Eyebrow>
        <Text variant="heading-md">From trigger to action in under 2 minutes.</Text>
      </div>
      <div>
        <Eyebrow>01 — Diagnose</Eyebrow>
        <Text variant="heading-md">Before we build anything, we map what exists.</Text>
      </div>
    </Stack>
  ),
  parameters: {
    docs: {
      description: { story: "Max 3 words. Uppercase mono. Never with emoji." },
    },
  },
};

const eyebrowMeta: Meta = {
  title: "Editorial/Eyebrow",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Uppercase mono label above section headings. Max 3 words. Never with emoji. Used for section numbers, taxonomy labels, phase markers.",
      },
    },
  },
};
export default eyebrowMeta;

// ─── Lede ─────────────────────────────────────────────────────

export const LedeDefault: StoryObj = {
  name: "Lede — Default",
  render: () => (
    <Lede>
      Most operators don't have a Notion problem. They have a workflow problem that Notion can solve
      — once the architecture is right.
    </Lede>
  ),
};

// ─── Pullquote ────────────────────────────────────────────────

export const PullquoteDefault: StoryObj = {
  name: "Pullquote — Default",
  render: () => (
    <Pullquote attribution="Beyker Estrada" attributionRole="Consultant">
      The system you need is never the one you started with. The one you started with is how you
      figure out what you actually need.
    </Pullquote>
  ),
};

// ─── Aside ───────────────────────────────────────────────────

export const AsideDefault: StoryObj = {
  name: "Aside — Default",
  render: () => (
    <Stack gap="4" style={{ maxWidth: "600px" }}>
      <Text variant="body-md">
        The automation runs on a 15-minute polling interval. For most operations teams, this is
        acceptable latency.
      </Text>
      <Aside label="Constraint">
        Notion's API has a rate limit of 3 requests/second. If your database has more than 500
        pages, the initial sync will take several minutes.
      </Aside>
    </Stack>
  ),
};

// ─── Manifesto ───────────────────────────────────────────────

export const ManifestoDefault: StoryObj = {
  name: "Manifesto — Default",
  render: () => (
    <div style={{ backgroundColor: "var(--bk-color-surface-sunken)", padding: "0" }}>
      <Manifesto eyebrow="What we believe">
        Operators don't need another framework. They need someone who's seen the same problems
        across enough contexts to know which solution actually holds.
      </Manifesto>
    </div>
  ),
};

// ─── WorkLog ─────────────────────────────────────────────────

export const WorkLogDefault: StoryObj = {
  name: "WorkLog — Default",
  render: () => (
    <WorkLog
      entries={[
        {
          timestamp: "2024-01-15",
          label: "Discovery",
          children: (
            <Text variant="body-md">
              Audited existing Notion workspace. Found 4 active databases, 2 abandoned, 3
              unmaintained. Identified the core operations database as the anchor.
            </Text>
          ),
        },
        {
          timestamp: "2024-01-22",
          label: "Architecture",
          children: (
            <Text variant="body-md">
              Rebuilt the project tracker with a proper status lifecycle. Linked to the client
              database via relation. Automated status rollups with a simple formula.
            </Text>
          ),
        },
        {
          timestamp: "2024-02-01",
          label: "Handoff",
          children: (
            <Text variant="body-md">
              Ran two 90-minute training sessions. Team owns it now. Async documentation in the
              workspace itself, not a separate doc.
            </Text>
          ),
        },
      ]}
    />
  ),
};

// ─── Specsheet ───────────────────────────────────────────────

export const SpecsheetDefault: StoryObj = {
  name: "Specsheet — Default",
  render: () => (
    <Specsheet
      title="Setup Session"
      items={[
        { term: "Format", detail: "2 × 90-minute video calls" },
        { term: "Deliverable", detail: "Rebuilt workspace + async documentation" },
        { term: "Timeline", detail: "2–3 weeks from start" },
        { term: "Languages", detail: "EN / ES" },
        { term: "Prerequisites", detail: "Existing Notion workspace (any state)" },
        { term: "Outcome", detail: "You own it — no recurring dependency on me" },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The document-style alternative to three-column feature grids. Use for service details, technical specs, scope definitions.",
      },
    },
  },
};

// ─── Full editorial composition ───────────────────────────────

export const FullComposition: StoryObj = {
  name: "Full Composition",
  render: () => (
    <Stack gap="7" style={{ maxWidth: "680px", padding: "48px" }}>
      <div>
        <Eyebrow>Case Study — 2024</Eyebrow>
        <Text variant="heading-xl">Rebuilding an ops team's Notion from the inside.</Text>
      </div>
      <Lede>
        A 40-person team. Four years of accumulated Notion. No documentation of what anything meant.
        The brief was: make it usable again.
      </Lede>
      <Divider />
      <WorkLog
        entries={[
          {
            timestamp: "Week 1",
            label: "Audit",
            children:
              "Mapped 23 databases, identified 4 critical paths, flagged 3 broken automations.",
          },
          {
            timestamp: "Week 2–3",
            label: "Rebuild",
            children:
              "Rebuilt the project tracker. Consolidated client databases. Wrote inline documentation.",
          },
        ]}
      />
      <Pullquote attribution="Head of Operations">
        We'd been building on top of confusion for two years. Now we build on top of structure.
      </Pullquote>
      <Aside label="Note">
        All rebuilds maintain data continuity — no records were deleted, only reorganized.
      </Aside>
    </Stack>
  ),
};
