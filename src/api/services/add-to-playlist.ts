import { Client } from '..';
import { PlayListResponse, PlayListSchema } from './create-playlist';

export interface AddToPlaylistProperties {
  playlistId: number;
  songId: number;
}

export const addToPlayList = async ({
  playlistId,
  songId,
}: AddToPlaylistProperties) => {
  const { data } = await Client.post<PlayListResponse>(
    `/playlist/add-song/${playlistId}`,
    {
      song_id: songId,
    }
  );

  return PlayListSchema.parse(data);
};
