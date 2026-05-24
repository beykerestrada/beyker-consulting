import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "../src/components/Card/Card";
import { Stack } from "../src/primitives/Stack";
import { Text } from "../src/primitives/Text";

const meta: Meta<typeof Card> = {
  title: "Surfaces/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "raised", "sunken"],
    },
    padding: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Solid surface with hairline border. No shadow by default — borders do the work, not halos. Max radius: 12px (lg). The look is paper, not balloons.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

const SampleContent = () => (
  <Stack gap="2">
    <Text variant="heading-sm">Notion Architecture Audit</Text>
    <Text variant="body-sm" color="secondary">
      A structured review of your current workspace against the systems you actually need.
    </Text>
  </Stack>
);

export const Default: Story = {
  args: {
    variant: "default",
    padding: true,
    children: <SampleContent />,
  },
};

export const Variants: Story = {
  render: () => (
    <Stack gap="4">
      <Card variant="default">
        <Text variant="heading-sm">Default</Text>
        <Text variant="body-sm" color="secondary">
          Canvas surface, twine border.
        </Text>
      </Card>
      <Card variant="raised">
        <Text variant="heading-sm">Raised</Text>
        <Text variant="body-sm" color="secondary">
          Vellum surface, subtle shadow.
        </Text>
      </Card>
      <Card variant="sunken">
        <Text variant="heading-sm">Sunken</Text>
        <Text variant="body-sm" color="secondary">
          Linen surface, inset feel.
        </Text>
      </Card>
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack gap="4">
      <Card variant="default">
        <Text variant="body-md">
          Default — no hover state on cards. Hover states change color/border, not size.
        </Text>
      </Card>
      <Card variant="raised" style={{ cursor: "pointer" }}>
        <Text variant="body-md">
          Raised — interactive cards use cursor: pointer, border-color change on hover.
        </Text>
      </Card>
    </Stack>
  ),
};
