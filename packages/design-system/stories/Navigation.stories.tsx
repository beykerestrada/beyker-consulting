import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../src/components/Button/Button";
import { Divider } from "../src/components/Divider/Divider";
import { Footer } from "../src/components/Footer/Footer";
import { TopNav } from "../src/components/TopNav/TopNav";
import { Stack } from "../src/primitives/Stack";
import { Text } from "../src/primitives/Text";

const meta: Meta = {
  title: "Navigation",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const TopNavDefault: StoryObj = {
  name: "TopNav — Default",
  render: () => (
    <div>
      <TopNav
        logo={
          <span
            style={{
              fontFamily: "var(--bk-type-family-mono)",
              fontSize: "var(--bk-type-size-mono-md)",
              fontWeight: 500,
              color: "var(--bk-color-signal-primary)",
              letterSpacing: "-0.01em",
            }}
          >
            BK
          </span>
        }
        links={[
          { label: "Work", href: "#" },
          { label: "Services", href: "#", active: true },
          { label: "About", href: "#" },
          { label: "Contact", href: "#" },
        ]}
        actions={
          <Button size="sm" variant="primary">
            Book a session
          </Button>
        }
      />
      <div style={{ padding: "48px", backgroundColor: "var(--bk-color-surface-canvas)" }}>
        <Text variant="body-md" color="muted">
          Scroll the page to see the glassmorphism effect on the nav. Opacity ≥ 0.85 — the only
          place backdrop-filter is permitted in this system.
        </Text>
      </div>
    </div>
  ),
};

export const DividerVariants: StoryObj = {
  name: "Divider — Variants",
  render: () => (
    <Stack gap="5" style={{ padding: "32px" }}>
      <div>
        <Text variant="body-sm" color="muted" style={{ marginBottom: "16px" }}>
          Full
        </Text>
        <Divider variant="full" />
      </div>
      <div>
        <Text variant="body-sm" color="muted" style={{ marginBottom: "16px" }}>
          Indented
        </Text>
        <Divider variant="indented" />
      </div>
      <div>
        <Text variant="body-sm" color="muted" style={{ marginBottom: "16px" }}>
          Labeled
        </Text>
        <Divider variant="labeled" label="Automation" />
      </div>
    </Stack>
  ),
};

export const FooterDefault: StoryObj = {
  name: "Footer — Default",
  render: () => (
    <Footer
      columns={[
        {
          label: "Work",
          links: [
            { label: "Case studies", href: "#" },
            { label: "Client work", href: "#" },
          ],
        },
        {
          label: "Services",
          links: [
            { label: "Setup Sessions", href: "#" },
            { label: "Notion architecture", href: "#" },
            { label: "Automation", href: "#" },
          ],
        },
        {
          label: "Connect",
          links: [
            { label: "Contact", href: "#" },
            { label: "LinkedIn", href: "#" },
          ],
        },
      ]}
      legal={<span>© 2024 Beyker Estrada Consulting — EN / ES</span>}
    />
  ),
};
