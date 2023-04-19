import type { Meta, StoryObj } from '@storybook/react';

import { PlayList } from '.';

export default {
  title: 'PlayList',
  component: PlayList,
} as Meta<typeof PlayList>;

type Story = StoryObj<typeof PlayList>;

export const Default: Story = {
  args: {
    title: 'Mozart’s TOP 10 Tracks',
    coverSrc:
      // :D
      'data:image/jpeg;base64,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',
    tracksCount: 13,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};