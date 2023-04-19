import type { Meta, StoryObj } from '@storybook/react';

import { Pagination } from './pagination';

export default {
  title: 'Pagination',
  component: Pagination,
} as Meta<typeof Pagination>;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    pagesCount: 15,
    page: 1,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
