import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../src/components/Badge/Badge";
import { Checkbox } from "../src/components/Checkbox/Checkbox";
import { Input } from "../src/components/Input/Input";
import { RadioGroup } from "../src/components/Radio/Radio";
import { Switch } from "../src/components/Switch/Switch";
import { Tag } from "../src/components/Tag/Tag";
import { Textarea } from "../src/components/Textarea/Textarea";
import { Inline } from "../src/primitives/Inline";
import { Stack } from "../src/primitives/Stack";

const meta: Meta = {
  title: "Controls/Form Fields",
  parameters: {
    docs: {
      description: {
        component:
          "Form controls. Border-focused design. No floating labels. No material elevation.",
      },
    },
  },
};

export default meta;

export const InputDefault: StoryObj = {
  name: "Input — Default",
  render: () => (
    <Stack gap="5" style={{ maxWidth: "400px" }}>
      <Input label="Full name" placeholder="Beyker Estrada" />
      <Input
        label="Email"
        type="email"
        placeholder="hola@bkestrada.com"
        hint="Used for session confirmations only."
      />
      <Input
        label="Website"
        type="url"
        placeholder="https://bkestrada.com"
        error="Enter a valid URL."
      />
    </Stack>
  ),
};

export const InputStates: StoryObj = {
  name: "Input — States",
  render: () => (
    <Stack gap="4" style={{ maxWidth: "400px" }}>
      <Input label="Default" placeholder="Placeholder" />
      <Input label="With hint" placeholder="Placeholder" hint="This is a hint." />
      <Input label="With error" placeholder="Placeholder" error="This field is required." />
      <Input label="Disabled" placeholder="Placeholder" disabled />
    </Stack>
  ),
};

export const TextareaDefault: StoryObj = {
  name: "Textarea — Default",
  render: () => (
    <div style={{ maxWidth: "400px" }}>
      <Textarea
        label="Tell me about your Notion setup"
        placeholder="What's working, what isn't, what you're trying to solve..."
        hint="The more context you give, the more useful the session."
        rows={5}
      />
    </div>
  ),
};

export const CheckboxDefault: StoryObj = {
  name: "Checkbox",
  render: () => (
    <Stack gap="3">
      <Checkbox label="Notion architecture" defaultChecked />
      <Checkbox label="Automation (n8n / Make)" />
      <Checkbox label="Async documentation" hint="SOPs, wikis, runbooks" />
      <Checkbox label="Disabled option" disabled />
    </Stack>
  ),
};

export const RadioDefault: StoryObj = {
  name: "Radio",
  render: () => (
    <RadioGroup
      legend="What best describes your situation?"
      defaultValue="existing"
      options={[
        { value: "new", label: "Starting from scratch", hint: "No existing Notion workspace." },
        {
          value: "existing",
          label: "Existing workspace that needs work",
          hint: "Already using Notion, needs restructuring.",
        },
        {
          value: "team",
          label: "Team rollout",
          hint: "Setting up Notion for a team for the first time.",
        },
      ]}
    />
  ),
};

export const SwitchDefault: StoryObj = {
  name: "Switch",
  render: () => (
    <Stack gap="3">
      <Switch label="Email notifications" defaultChecked />
      <Switch label="Weekly digest" />
      <Switch label="Marketing emails" hint="Updates about new services and workshops." />
      <Switch label="Disabled" disabled />
    </Stack>
  ),
};

export const TagsAndBadges: StoryObj = {
  name: "Tag + Badge",
  render: () => (
    <Stack gap="5">
      <div>
        <p
          style={{
            fontFamily: "var(--bk-type-family-mono)",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            color: "var(--bk-color-ink-muted)",
            marginBottom: "12px",
          }}
        >
          Tags — pill radius, taxonomy labels
        </p>
        <Inline gap="2" wrap>
          <Tag>Notion</Tag>
          <Tag>Automation</Tag>
          <Tag>n8n</Tag>
          <Tag>Strategy</Tag>
          <Tag>Operations</Tag>
        </Inline>
      </div>
      <div>
        <p
          style={{
            fontFamily: "var(--bk-type-family-mono)",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            color: "var(--bk-color-ink-muted)",
            marginBottom: "12px",
          }}
        >
          Badges — square radius, status labels
        </p>
        <Inline gap="2" wrap>
          <Badge variant="default">Draft</Badge>
          <Badge variant="success">Shipped</Badge>
          <Badge variant="warning">In progress</Badge>
          <Badge variant="danger">Blocked</Badge>
        </Inline>
      </div>
    </Stack>
  ),
};
