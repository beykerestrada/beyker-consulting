import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";

const bkTheme = create({
  base: "light",

  // Brand
  brandTitle: "Beyker Consulting — Workshop",
  brandUrl: "/",
  brandTarget: "_self",

  // Typography — mirrors the system tokens
  fontBase:
    "'General Sans', system-ui, sans-serif",
  fontCode:
    "'Commit Mono', ui-monospace, monospace",

  // Colors from Workshop palette
  colorPrimary: "#3A5A40",
  colorSecondary: "#3A5A40",

  // UI
  appBg: "#EBE7DC",
  appContentBg: "#EBE7DC",
  appBorderColor: "#C7C0AE",
  appBorderRadius: 4,

  // Text
  textColor: "#1F1B16",
  textInverseColor: "#F4F1E8",
  textMutedColor: "#8A8073",

  // Toolbar
  barTextColor: "#5C5448",
  barSelectedColor: "#3A5A40",
  barBg: "#F4F1E8",

  // Form
  inputBg: "#F4F1E8",
  inputBorder: "#C7C0AE",
  inputTextColor: "#1F1B16",
  inputBorderRadius: 4,
});

addons.setConfig({
  theme: bkTheme,
});
