import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';

export default {
  title: 'Button',
  component: Button,
  args: {
    children: 'Click on Me',
  },
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Red: Story = {
  args: {
    variant: 'red',
  },
};

export const Dark: Story = {
  args: {
    variant: 'dark',
  },
};
