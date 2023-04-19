import type { Meta, StoryObj } from '@storybook/react';

import { NoResultCard } from './';

export default {
  title: 'No Result Card',
  component: NoResultCard,
} as Meta<typeof NoResultCard>;

type Story = StoryObj<typeof NoResultCard>;

export const Default: Story = {
  args: {
    variant: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
