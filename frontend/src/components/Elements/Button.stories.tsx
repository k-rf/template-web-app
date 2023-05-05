import { Box, Stack } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

export default {
  component: Button,
  args: {
    children: "ボタン",
    color: "primary",
  },
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Variant: Story = {
  render: (args) => {
    return <Buttons {...args} />;
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => {
    return <Buttons {...args} />;
  },
};

export const Colors: Story = {
  args: {
    fullWidth: true,
  },
  render: (args) => {
    return (
      <Stack direction="column" spacing={2}>
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
    <Stack direction="row" spacing={2}>
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
