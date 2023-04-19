import { SongsResponse, getSongs, useGetSongs } from '@/api';
import { Search } from '@/components/common/search';
import { Header } from '@/components/layout/header';
import { deleteCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import { Roboto } from 'next/font/google';
import { twJoin } from 'tailwind-merge';
import logger from 'node-color-log';
import { MusicCard } from '@/components/common/music-card';
import Head from 'next/head';
import React from 'react';
import { Pagination } from '@/components/common/pagination';
import { NoResultCard } from '@/components/common/no-result-card';
import { useQueryClient } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import {
  PlayListsResponse,
  getPlayLists,
  useGetPlaylists,
} from '@/api/services/get-playlists';
import { TbPlaylistOff } from 'react-icons/tb';
import Link from 'next/link';

const roboto = Roboto({ weight: ['300', '400', '500'], subsets: ['latin'] });

const DEFAULT_PAGE = 1;
const PAGE_SIZE = 25;

interface HomePageProperties {
  initialSongsData: SongsResponse;
  initialPlaylistsData: PlayListsResponse;
}

export const getServerSideProps: GetServerSideProps<
  HomePageProperties
> = async (context) => {
  const token = context.req.cookies.token;

  try {
    const songs = await getSongs({
      pageSize: PAGE_SIZE,
      page: DEFAULT_PAGE,
      token,
    });

    const playlists = await getPlayLists({ token });

    return {
      props: {
        initialSongsData: songs,
        initialPlaylistsData: playlists,
      },
    };
  } catch (error) {
    logger.color('black').bgColor('red').log(error);
    deleteCookie('token', { req: context.req, res: context.res });
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};

export default function HomePage({
  initialSongsData,
  initialPlaylistsData,
}: HomePageProperties) {
  const [page, setPage] = React.useState(DEFAULT_PAGE);
  const [keyword, setKeyword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const queryClient = useQueryClient();
  const { data: songs } = useGetSongs({
    page,
    pageSize: PAGE_SIZE,
    initialData: initialSongsData,
    query: keyword,
    onSettled: () => setIsLoading(false),
  });

  const { data: playlists } = useGetPlaylists({
    initialData: initialPlaylistsData,
  });

  const noResult = songs.result.items.length === 0;
  const noPlayLists = playlists.result.items
    ? playlists.result.items?.length === 0
    : true;

  const handleSearch = (q: string) => {
    setPage(1);
    setKeyword(q);
  };

  const handleChangingPage = useDebouncedCallback((p: number) => {
    setPage(p);
    const isPageInCache = !!queryClient.getQueryData(['songs', p, keyword]);
    setIsLoading(!isPageInCache);
  }, 333);

  return (
    <>
      <Head>
        <title>Melody</title>
      </Head>
      <main
        className={twJoin(
          roboto.className,
          'flex min-h-screen w-screen flex-col items-center justify-center bg-chineseBlack'
        )}
      >
        <Header />
        <div className="flex min-h-screen w-screen flex-col items-center">
          <div className="my-24 flex w-screen flex-col items-center">
            <div className="flex select-none flex-col items-center">
              <div className="text-6xl font-light text-coralRed md:text-8xl">
                Melody
              </div>
              <div className="mb-6 mt-3 text-center text-xl text-begonia md:mb-2 md:text-2xl">
                Unleash your inner groove with our beats
              </div>
            </div>
            <div className="flex w-full flex-col items-start px-12">
              <div className="mb-2 text-lg text-snow">Your Playlists:</div>
              <div className="w-full rounded-md border border-solid border-snow px-2 py-4">
                {noPlayLists ? (
                  <div className="my-8 flex flex-col items-center text-snow">
                    <TbPlaylistOff size={50} />
                    <div className="mt-6 text-center text-lg">
                      looks like you don&apos;t have any playlists...
                    </div>
                    <Link href="#">
                      <div className="text-md mt-2 text-center underline">
                        Click here to create your first playlist
                      </div>
                    </Link>
                  </div>
                ) : (
                  <div>Coming Soon!</div>
                )}
              </div>
            </div>
          </div>
          <Search containerClassName="my-8" onSearch={handleSearch} />
          <div className="flex flex-wrap items-center justify-center px-8">
            {noResult ? (
              <NoResultCard />
            ) : (
              songs.result.items.map((song) => (
                <div key={song.id} className="m-4">
                  <MusicCard
                    title={song.title}
                    artist={song.artist_name}
                    album={song.album_name}
                    fileId={song.id}
                    fileFormat={song.format}
                    loading={isLoading}
                  />
                </div>
              ))
            )}
          </div>

          {!noResult && (
            <div className="my-8">
              <Pagination
                page={page}
                pagesCount={songs.result._meta.pageCount}
                onChange={handleChangingPage}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
