import type { Meta, StoryObj } from "@storybook/react";

import { Field } from "./Field";

export default { component: Field } as Meta<typeof Field>;

type Story = StoryObj<typeof Field>;

export const Default: Story = {};

export const Label: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: "ラベル",
  },
};

export const Error: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: "エラー",
    error: true,
  },
};
