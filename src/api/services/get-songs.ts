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
      self: z.object({ href: z.string() }),
      first: z.object({ href: z.string() }),
      last: z.object({ href: z.string() }),
      next: z.object({ href: z.string() }),
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
  query?: string;
  page?: number;
  perPageItems?: number;
}

export const getSongs = async ({
  query,
  page,
  perPageItems,
}: GetSongsProperties) => {
  const { data } = await Client.get<SongsResponse>('/song', {
    params: {
      'filter[title][like]': query,
      'per-page': perPageItems,
      page: page,
    },
  });

  return SongsSchema.parse(data);
};
