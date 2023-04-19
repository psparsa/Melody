import type { Meta, StoryObj } from '@storybook/react';

import { ImageInput } from './image-input';

export default {
  title: 'ImageInput',
  component: ImageInput,
} as Meta<typeof ImageInput>;

type Story = StoryObj<typeof ImageInput>;

export const Default: Story = {
  args: {},
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
