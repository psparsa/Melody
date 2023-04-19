import { twMerge } from 'tailwind-merge';
import { Button } from '../button';

export interface MusicCardProperties {
  title: string;
  artist: string;
  album: string;
  fileId: number;
  fileFormat: string;
  loading?: boolean;
}

export const MusicCard = ({
  title,
  artist,
  album,
  fileId,
  fileFormat,
  loading,
}: MusicCardProperties) => {
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

      <div className="mt-4 w-full">
        <Button variant="dark" fluid>
          Download
        </Button>
      </div>
    </div>
  );
};
