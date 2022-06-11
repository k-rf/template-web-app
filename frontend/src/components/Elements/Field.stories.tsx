import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { Field } from "./Field";

type Meta = ComponentMeta<typeof Field>;
type Story = ComponentStoryObj<typeof Field>;

export default { title: "Elements/Field", component: Field } as Meta;

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
