import { useMutation } from '@tanstack/react-query';
import { Client } from '..';
import { z } from 'zod';

export const PlayListSchema = z.object({
  ok: z.boolean(),
  result: z.object({
    title: z.string(),
    created_at: z.string(),
    id: z.number(),
    cover: z.string(),
    updated_at: z.null(),
    songs: z.array(z.unknown()),
  }),
});

export type PlayListResponse = z.infer<typeof PlayListSchema>;

interface CreatePlaylistProperties {
  title: string;
  cover: File;
}

export const createPlayList = async ({
  title,
  cover,
}: CreatePlaylistProperties) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('cover', cover);
  const { data } = await Client.post<PlayListResponse>('/playlist', formData);

  return PlayListSchema.parse(data);
};

export const useCreatePlayList = () =>
  useMutation({
    mutationKey: ['create-play-list'],
    mutationFn: createPlayList,
  });
