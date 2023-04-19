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

const roboto = Roboto({ weight: ['300', '400', '500'], subsets: ['latin'] });

const DEFAULT_PAGE = 1;
const PAGE_SIZE = 25;

interface HomePageProperties {
  initialSongsData: SongsResponse;
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

    return {
      props: {
        initialSongsData: songs,
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

export default function HomePage({ initialSongsData }: HomePageProperties) {
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

  const noResult = songs.result.items.length === 0;

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
              <div className="text-8xl font-light text-coralRed">Melody</div>
              <div className="mt-3 text-2xl text-begonia">
                Unleash your inner groove with our beats
              </div>
            </div>
            <Search containerClassName="mt-8" onSearch={handleSearch} />
          </div>
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
