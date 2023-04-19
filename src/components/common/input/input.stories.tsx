import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './';

export default {
  title: 'Input',
  component: Input,
} as Meta<typeof Input>;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {},
};
