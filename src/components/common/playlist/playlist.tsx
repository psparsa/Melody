import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

export interface PlayListProperties {
  title: string;
  coverSrc: string;
  containerClassName?: string;
}

export const PlayList = ({
  title,
  coverSrc,
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
      <div className="mt-4 flex w-full justify-center truncate text-lg">
        {title}
      </div>
    </div>
  );
};
