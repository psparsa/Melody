import { useQuery } from '@tanstack/react-query';
import { Client } from '../';
import { z } from 'zod';

export const SongsSchema = z.object({
  ok: z.boolean(),
  result: z.object({
    items: z.array(
      z.object({
        id: z.number(),
        album_name: z.string(),
        artist_name: z.string(),
        duration: z.string(),
        title: z.string(),
        year: z.string(),
        file: z.string(),
        format: z.string(),
      })
    ),
    _links: z.object({
      self: z.object({ href: z.string() }).optional(),
      first: z.object({ href: z.string() }).optional(),
      last: z.object({ href: z.string() }).optional(),
      next: z.object({ href: z.string() }).optional(),
    }),
    _meta: z.object({
      totalCount: z.number(),
      pageCount: z.number(),
      currentPage: z.number(),
      perPage: z.number(),
    }),
  }),
});

export type SongsResponse = z.infer<typeof SongsSchema>;

interface GetSongsProperties {
  page: number;
  pageSize: number;
  query?: string;
  token?: string;
}

export const getSongs = async ({
  page,
  pageSize,
  query,
  token,
}: GetSongsProperties) => {
  const { data } = await Client.get<SongsResponse>('/song', {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : undefined),
    },
    params: {
      'filter[title][like]': query,
      'per-page': pageSize,
      page: page,
    },
  });

  return SongsSchema.parse(data);
};

interface UseGetSongs {
  initialData: SongsResponse;
  page: number;
  pageSize: number;
  query: string;
  onSettled?: (data: SongsResponse | undefined, error: unknown) => void;
}

export const useGetSongs = ({
  pageSize,
  page,
  query,
  initialData,
  onSettled,
}: UseGetSongs) =>
  useQuery({
    queryKey: ['songs', page, query],
    queryFn: () => getSongs({ page, pageSize, query }),
    initialData,
    onSettled,
  });
