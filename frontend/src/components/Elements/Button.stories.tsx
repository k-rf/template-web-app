import { Box, Stack } from "@mui/material";
import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { Button } from "./Button";

type Meta = ComponentMeta<typeof Button>;
type Story = ComponentStoryObj<typeof Button>;

export default { title: "Elements/Button", component: Button } as Meta;

export const Default: Story = {
  args: {
    children: "ボタン",
    color: "primary",
  },
};

export const Variant: Story = {
  ...Default,
  args: {
    ...Default.args,
  },
  render: (args) => {
    return <Buttons {...args} />;
  },
};

export const Disabled: Story = {
  ...Default,
  args: {
    ...Default.args,
    disabled: true,
  },
  render: (args) => {
    return <Buttons {...args} />;
  },
};

export const Colors: Story = {
  ...Default,
  args: {
    ...Default.args,
    fullWidth: true,
  },
  render: (args) => {
    return (
      <Stack direction={"column"} spacing={2}>
        <Buttons {...args} color="primary" width={120}>
          primary
        </Buttons>
        <Buttons {...args} color="secondary" width={120}>
          secondary
        </Buttons>
        <Buttons {...args} color="success" width={120}>
          success
        </Buttons>
        <Buttons {...args} color="warning" width={120}>
          warning
        </Buttons>
        <Buttons {...args} color="error" width={120}>
          error
        </Buttons>
        <Buttons {...args} color="info" width={120}>
          info
        </Buttons>
      </Stack>
    );
  },
};

const Buttons = (args: Story["args"] & { width?: number }) => {
  const { width, ...props } = args;
  return (
    <Stack direction={"row"} spacing={2}>
      <Box width={width}>
        <Button {...props} variant="contained" />
      </Box>
      <Box width={width}>
        <Button {...props} variant="outlined" />
      </Box>
      <Box width={width}>
        <Button {...props} variant="text" />
      </Box>
    </Stack>
  );
};
