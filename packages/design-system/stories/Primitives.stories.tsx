import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "../src/primitives/Box";
import { Grid, GridItem } from "../src/primitives/Grid";
import { Inline } from "../src/primitives/Inline";
import { Stack } from "../src/primitives/Stack";
import { Text } from "../src/primitives/Text";

const meta: Meta = {
  title: "Primitives/Layout",
  parameters: {
    docs: {
      description: {
        component:
          "Layout primitives with token-bound props. No arbitrary values — all spacing and sizing references design tokens.",
      },
    },
  },
};

export default meta;

const PlaceholderBox = ({
  label,
  tone = "sunken",
}: { label: string; tone?: "sunken" | "raised" }) => (
  <div
    style={{
      backgroundColor:
        tone === "sunken" ? "var(--bk-color-surface-sunken)" : "var(--bk-color-surface-raised)",
      border: "1px solid var(--bk-color-border-default)",
      borderRadius: "var(--bk-radius-sm)",
      padding: "var(--bk-space-3)",
      fontFamily: "var(--bk-type-family-mono)",
      fontSize: "var(--bk-type-size-mono-sm)",
      color: "var(--bk-color-ink-muted)",
      textAlign: "center" as const,
    }}
  >
    {label}
  </div>
);

export const BoxDefault: StoryObj = {
  name: "Box",
  render: () => (
    <Box
      padding="5"
      radius="md"
      style={{
        border: "1px solid var(--bk-color-border-default)",
        backgroundColor: "var(--bk-color-surface-raised)",
      }}
    >
      <Text variant="body-md">Box with padding="5" and radius="md"</Text>
    </Box>
  ),
};

export const StackDefault: StoryObj = {
  name: "Stack",
  render: () => (
    <Stack gap="4">
      <PlaceholderBox label="Item 1" />
      <PlaceholderBox label="Item 2" />
      <PlaceholderBox label="Item 3" />
    </Stack>
  ),
};

export const StackRow: StoryObj = {
  name: "Stack — Row direction",
  render: () => (
    <Stack gap="4" direction="row" align="center">
      <PlaceholderBox label="A" />
      <PlaceholderBox label="B" />
      <PlaceholderBox label="C" />
    </Stack>
  ),
};

export const InlineDefault: StoryObj = {
  name: "Inline",
  render: () => (
    <Inline gap="3" wrap>
      <PlaceholderBox label="Tag 1" />
      <PlaceholderBox label="Tag 2" />
      <PlaceholderBox label="Tag 3" />
      <PlaceholderBox label="Tag 4" />
    </Inline>
  ),
};

export const GridDefault: StoryObj = {
  name: "Grid — 12 columns",
  render: () => (
    <Grid columns={12} gap="4">
      <GridItem span={5}>
        <PlaceholderBox label="5 / 12" />
      </GridItem>
      <GridItem span={7}>
        <PlaceholderBox label="7 / 12" />
      </GridItem>
      <GridItem span={4}>
        <PlaceholderBox label="4 / 12" />
      </GridItem>
      <GridItem span={4}>
        <PlaceholderBox label="4 / 12" />
      </GridItem>
      <GridItem span={4}>
        <PlaceholderBox label="4 / 12" />
      </GridItem>
    </Grid>
  ),
  parameters: {
    docs: {
      description: { story: "Asymmetric 5/7 split — preferred over equal 6/6." },
    },
  },
};

export const TextVariants: StoryObj = {
  name: "Text — All variants",
  render: () => (
    <Stack gap="4">
      {(
        [
          "display-xl",
          "display-lg",
          "heading-xl",
          "heading-lg",
          "heading-md",
          "heading-sm",
          "body-lg",
          "body-md",
          "body-sm",
          "mono-md",
          "mono-sm",
        ] as const
      ).map((variant) => (
        <div key={variant} style={{ display: "flex", gap: "16px", alignItems: "baseline" }}>
          <span
            style={{
              fontFamily: "var(--bk-type-family-mono)",
              fontSize: "11px",
              color: "var(--bk-color-ink-muted)",
              width: "120px",
              flexShrink: 0,
            }}
          >
            {variant}
          </span>
          <Text variant={variant}>
            {variant.startsWith("mono") ? "notion/v2.1" : "Beyker Consulting"}
          </Text>
        </div>
      ))}
    </Stack>
  ),
};
