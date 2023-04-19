import type { Meta, StoryObj } from '@storybook/react';

import { MusicCard } from '.';

export default {
  title: 'Music Card',
  component: MusicCard,
} as Meta<typeof MusicCard>;

type Story = StoryObj<typeof MusicCard>;

export const Default: Story = {
  args: {
    title: 'Along Comes Mary',
    artist: 'Cal Tjader',
    album: 'The Soul Of Jazz (Jazz Club)',
    fileFormat: 'mp3',
    fileId: 1234,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
