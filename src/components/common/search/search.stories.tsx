import type { Meta, StoryObj } from '@storybook/react';

import { Search } from './search';

export default {
  title: 'Search',
  component: Search,
} as Meta<typeof Search>;

type Story = StoryObj<typeof Search>;

export const Default: Story = {
  args: {},
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
