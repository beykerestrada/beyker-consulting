import type { Preview } from "@storybook/react";
import "../src/styles/variables.css";
import "../src/styles/base.css";
import "../src/styles/utilities.css";
import "../src/styles/components.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "canvas",
      values: [
        { name: "canvas", value: "#EBE7DC" },
        { name: "raised", value: "#F4F1E8" },
        { name: "sunken", value: "#DDD8C9" },
      ],
    },
    options: {
      storySort: {
        order: [
          "Foundations",
          ["Color", "Typography", "Spacing", "Motion", "Voice", "Layout", "Hard NOs"],
          "Primitives",
          "Surfaces",
          "Controls",
          "Navigation",
          "Editorial",
        ],
      },
    },
  },
};

export default preview;
