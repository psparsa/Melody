import { useQuery } from '@tanstack/react-query';
import { Client } from '..';
import { z } from 'zod';

export const PlayListsSchema = z.object({
  ok: z.boolean(),
  result: z.object({
    items: z.array(
      z.object({
        id: z.number(),
        title: z.string(),
        cover: z.string(),
        created_at: z.string(),
        songs: z.array(z.unknown()),
      })
    ),
    _links: z.object({
      self: z.object({ href: z.string() }),
      first: z.object({ href: z.string() }).optional(),
      last: z.object({ href: z.string() }).optional(),
    }),
    _meta: z.object({
      totalCount: z.number(),
      pageCount: z.number(),
      currentPage: z.number(),
      perPage: z.number(),
    }),
  }),
});

export type PlayListsResponse = z.infer<typeof PlayListsSchema>;

interface GetPlayListsProperties {
  token?: string;
}

export const getPlayLists = async ({ token }: GetPlayListsProperties) => {
  const { data } = await Client.get<PlayListsResponse>('/playlist', {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : undefined),
    },
  });

  return PlayListsSchema.parse(data);
};

interface UseGetPlaylistsProperties {
  initialData: PlayListsResponse;
}

export const useGetPlaylists = ({ initialData }: UseGetPlaylistsProperties) =>
  useQuery({
    queryKey: ['playlists'],
    queryFn: () => getPlayLists({}),
    initialData,
  });
