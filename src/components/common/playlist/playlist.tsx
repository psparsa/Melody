import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

export interface PlayListProperties {
  title: string;
  coverSrc: string;
  tracksCount: number;
  containerClassName?: string;
}

export const PlayList = ({
  title,
  coverSrc,
  tracksCount,
  containerClassName,
}: PlayListProperties) => {
  return (
    <div
      className={twMerge(
        containerClassName,
        'flex w-60 cursor-pointer select-none flex-col items-center rounded-sm bg-snow p-2 transition-all hover:scale-105'
      )}
    >
      <div className="relative h-56 w-56 overflow-hidden rounded-md bg-taupeGray">
        <Image src={coverSrc} alt={title} style={{ objectFit: 'cover' }} fill />
      </div>
      <div className="mt-1 w-full font-extralight">
        Tracks Count: {tracksCount}
      </div>
      <div className="mt-2 flex w-full justify-center truncate text-xl">
        {title}
      </div>
    </div>
  );
};
