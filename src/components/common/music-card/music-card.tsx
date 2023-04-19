import { twMerge } from 'tailwind-merge';
import { Button } from '../button';
import { AiOutlinePlus } from 'react-icons/ai';
import { Popover } from 'react-tiny-popover';
import React from 'react';
import { addToPlayList } from '@/api/services/add-to-playlist';
import { toast } from 'react-toastify';

export interface MusicCardProperties {
  title: string;
  artist: string;
  album: string;
  fileId: number;
  fileFormat: string;
  playLists: { title: string; id: number }[];
  loading?: boolean;
}

export const MusicCard = ({
  title,
  artist,
  album,
  fileId,
  fileFormat,
  playLists,
  loading,
}: MusicCardProperties) => {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const handleAddingToPlaylist = (playlistId: number, playListName: string) => {
    setIsPopoverOpen(false);
    addToPlayList({ songId: fileId, playlistId })
      .then(() => toast.success(`${title} added to ${playListName}`))
      .catch(console.log);
  };

  return (
    <div
      className={twMerge(
        'flex h-36 w-80 flex-col items-center justify-center rounded-md bg-snow p-2 shadow-md shadow-gray-800',
        loading ? 'blur-md' : undefined
      )}
    >
      <div className="w-full truncate text-center text-lg font-semibold">
        {title} by {artist}
      </div>
      <div className="mt-1 w-full truncate text-center  font-light">
        {album}
      </div>

      <div className="mt-4 flex w-full">
        <div className="flex-1">
          <Button variant="dark" fluid>
            Download
          </Button>
        </div>
        <Popover
          isOpen={isPopoverOpen}
          positions={['top', 'bottom']}
          content={
            <div className="mb-2 h-40 w-20 overflow-scroll rounded-lg bg-gray-700 p-1 shadow-2xl">
              {playLists.map((item) => (
                <div
                  key={item.id}
                  className="flex w-full cursor-pointer justify-center truncate border-b pb-1 font-bold text-snow hover:text-coralRed"
                  onClick={() => handleAddingToPlaylist(item.id, item.title)}
                >
                  {item.title}
                </div>
              ))}
            </div>
          }
        >
          <div
            className="ml-3 flex h-full w-12 cursor-pointer items-center justify-center rounded-xl bg-coralRed text-snow"
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          >
            <AiOutlinePlus size={30} />
          </div>
        </Popover>
      </div>
    </div>
  );
};
